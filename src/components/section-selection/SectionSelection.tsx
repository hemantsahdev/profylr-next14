"use client";

import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import React, { useState } from "react";
import {restrictToWindowEdges } from "@dnd-kit/modifiers";
import { arrayMove } from "@dnd-kit/sortable";
import { Download , Undo2 } from "lucide-react";
import { toast } from "sonner";
import { ResumeSection } from "@/types/resumeSections";
import { useRouter, useParams } from "next/navigation";
import { Button } from "../ui/button";
import SectionsList from "./SectionsList";
import ResumeBuilder from "./ResumeBuilder";


  

const SectionSelection = () => {

    const router = useRouter();
    const params = useParams();

    const [resumeSections, setResumeSections] = useState<ResumeSection[]>([]);
    const [history, setHistory] = useState<ResumeSection[][]>([]);
  
    // Create sensors for drag interactions
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    // Handle when a section is dropped in the resume
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
    
        if (!over || active.id === over.id) return; // No change needed
    
        // Save current state to history for undo functionality
        setHistory([...history, [...resumeSections]]);
    
        const activeIndex = resumeSections.findIndex((s) => s.id === active.id);
        const overIndex = resumeSections.findIndex((s) => s.id === over.id);
    
        if (activeIndex !== -1 && overIndex !== -1) {
            // Reorder the sections
            setResumeSections((prev):ResumeSection[] => arrayMove(prev, activeIndex, overIndex));
        } else {
            // Check if the section is already in resumeSections
            const alreadyExists = resumeSections.some((s) => s.id === active.id);
            if (alreadyExists) {
                toast.error("This section is already added.");
                return;
            }

            // If the section is being added from the available sections
            const section = RESUME_SECTIONS.find((s) => s.id === active.id);
            if (section) {
                setResumeSections([...resumeSections, { ...section }]);
                toast.success(`Added ${section.title} section`);
            }
        }
    };
    
  
    // Handle removing a section from the resume
    const handleRemoveSection = (sectionId: string) => {
        setHistory([...history, [...resumeSections]]);
        const removedSection = resumeSections.find(section => section.id === sectionId);
        setResumeSections(resumeSections.filter(section => section.id !== sectionId));
        if (removedSection) {
            toast.success(`Removed ${removedSection.title} section`);
        }
    };
  
    // Handle reordering sections in the resume
    const handleReorderSections = (result: ResumeSection[]) => {
        setHistory([...history, [...resumeSections]]);
        setResumeSections(result);
        toast.success("Sections reordered");
    };
  
    // Update section content
    const handleUpdateSection = (sectionId: string, content: string) => {
        setHistory([...history, [...resumeSections]]);
        setResumeSections(resumeSections.map(section => 
            section.id === sectionId ? { ...section, content } : section
        ));
    };
  
    // Undo last action
    const handleUndo = () => {
        if (history.length > 0) {
            const previousState = history[history.length - 1];
            setResumeSections(previousState);
            setHistory(history.slice(0, -1));
            toast.success("Action undone");
        }
    };

    // Export resume as JSON
    const handleExportResume = () => {
        try {
            const resumeData = {
                sections: resumeSections,
                exportDate: new Date().toISOString(),
            };
      
            const dataStr = JSON.stringify(resumeData, null, 2);
            const dataUri = "data:application/json;charset=utf-8,"+ encodeURIComponent(dataStr);
      
            const exportFileDefaultName = `my-resume-${new Date().toLocaleDateString()}.json`;
      
            const linkElement = document.createElement("a");
            linkElement.setAttribute("href", dataUri);
            linkElement.setAttribute("download", exportFileDefaultName);
            linkElement.click();
      
            toast.success("Resume exported successfully");
        } catch (error) {
            toast.error("Failed to export resume");
            console.error("Export error:", error);
        }
    };

    // Handle proceeding to the next step
    const handleProceed = () => {
        if (resumeSections.length === 0) {
            toast.error("Please add at least one section to your resume");
            return;
        }
    
        toast.success("Ready to edit your resume content", {
            description: "Fill in the details for each section"
        });

        console.log(params);
        router.push("/resume/fill-details");
    };


    return (
        <section className="h-full w-full" >
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">
            Drag & Drop <span className="text-gray-600 font-normal">sections in the resume</span>
                </h1>
          
                <div className="flex items-center gap-2">
                    <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleUndo}
                        disabled={history.length === 0}
                        className="flex items-center gap-1 text-gray-600"
                    >
                        <Undo2 size={16} />
                        <span>Undo</span>
                    </Button>
            
                    <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleExportResume}
                        disabled={resumeSections.length === 0}
                        className="flex items-center gap-1 text-gray-600"
                    >
                        <Download size={16} />
                        <span>Export</span>
                    </Button>
                </div>
            </div>

            <DndContext 
                sensors={sensors}
                modifiers={[restrictToWindowEdges]} 
                onDragEnd={handleDragEnd}
            >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
                    <div className="lg:col-span-2 overflow-hidden ">
                        <SectionsList 
                            selectedSections={resumeSections.map(section => section.id)} 
                            onProceed={handleProceed}
                        />
                    </div>
            
                    <div className="lg:col-span-1 h-[50vh]">
                        <ResumeBuilder 
                            sections={resumeSections} 
                            onRemoveSection={handleRemoveSection}
                            onReorderSections={handleReorderSections}
                            onUpdateSection={handleUpdateSection}
                        />
                    </div>
                </div>
            </DndContext>
        </section>
    );
};

export const RESUME_SECTIONS: ResumeSection[] = [
    { "id": "header", "title": "Header", "color": "#3B82F6", "icon": "user", "placeholder": "This section will contain your full name, phone number, email address, and any relevant links like LinkedIn or a personal portfolio. A well-structured header ensures recruiters can easily contact you.", "type": "essential" },
    { "id": "summary", "title": "Summary", "color": "#10B981", "icon": "file-text", "placeholder": "This section should briefly summarize your professional background, key skills, and career aspirations. A strong summary helps create a great first impression.", "type": "essential" },
    { "id": "skills", "title": "Skills", "color": "#F97316", "icon": "code", "placeholder": "This section will showcase your technical and soft skills relevant to the job. Highlight your key competencies to help recruiters quickly assess your expertise.", "type": "essential" },
    { "id": "education", "title": "Education", "color": "#6366F1", "icon": "graduation-cap", "placeholder": "Here, you should list your degree(s), institution name, graduation year, and any notable achievements like honors or relevant coursework. This helps employers understand your academic background.", "type": "essential" },
    { "id": "work-experience", "title": "Work Experience", "color": "#22C55E", "icon": "briefcase", "placeholder": "This section will contain details about your previous jobs, including job titles, company names, employment periods, and key responsibilities or achievements. Focus on measurable impact and relevant experience.", "type": "essential" },
    { "id": "projects", "title": "Projects", "color": "#8B5CF6", "icon": "folder", "placeholder": "Use this section to highlight key projects you've worked on, whether personal, academic, or professional. Mention technologies used, your role, and project outcomes to demonstrate your problem-solving abilities.", "type": "essential" },
    { "id": "certifications", "title": "Certifications", "color": "#EC4899", "icon": "award", "placeholder": "This section will list any certifications you've earned, along with the issuing organization and completion date. Certifications can strengthen your profile by showcasing specialized skills.", "type": "additional" },
    { "id": "awards", "title": "Awards", "color": "#06B6D4", "icon": "trophy", "placeholder": "This section is for any awards or recognitions you've received, whether academic, professional, or extracurricular. Including awards can highlight your achievements and dedication.", "type": "additional" },
    { "id": "languages", "title": "Languages", "color": "#F59E0B", "icon": "globe", "placeholder": "Here, you can list the languages you speak along with your proficiency levels (e.g., Fluent, Intermediate, Beginner). Multilingual abilities can be a valuable asset in certain roles.", "type": "additional" },
    { "id": "hobbies", "title": "Hobbies", "color": "#EF4444", "icon": "heart", "placeholder": "This section lets you share personal interests and activities that showcase your personality. Hobbies can also reflect valuable soft skills like teamwork, creativity, or leadership.", "type": "additional" },
    { "id": "publications", "title": "Publications", "color": "#0EA5E9", "icon": "book", "placeholder": "Use this section to list any published research papers, articles, or books you have authored. Providing publication details can help establish credibility in your field.", "type": "additional" },
    { "id": "volunteer-experience", "title": "Volunteer Experience", "color": "#A855F7", "icon": "helping-hand", "placeholder": "This section is for listing volunteer work you've done, including the organization name, your role, and contributions. Volunteer experience can demonstrate leadership, initiative, and social responsibility.", "type": "additional" },
    { "id": "references", "title": "References", "color": "#F43F5E", "icon": "users", "placeholder": "Here, you can include references from previous employers or mentors. Typically, this section contains names, job titles, companies, and contact details, if required by the employer.", "type": "additional" }
]  
  ;

export default SectionSelection;



{/* 
      const handleDragEnd = (event) => {
        const { active, over } = event;
    
        if (!over) return; // No valid drop target
    
        const draggedItem =
        availableSections.find((item) => item.id === active.id) ||
            sectionsInResume.find((item) => item.id === active.id);
    
        if (!draggedItem) return; // Item not found
    
        console.log("Active", active);
        console.log("Over", over);

        // Check if the drop target is Section 2 or an item within Section 2
        if (over.id === "section2" || sectionsInResume.some((item) => item.id === over.id)) {
            console.log("hello");

            // get dropped
            if(!sectionsInResume.some((item) => item.id === active.id)){
                setSectionsInResume((prev) => [...prev, draggedItem]);
                setAvailableSections((prev) =>
                    prev.filter((item) => item.id !== active.id)
                );
            }

            // If over.id matches a specific item, reorder
            else {
                const oldIndex = sectionsInResume.findIndex((item) => item.id === active.id);
                const newIndex = sectionsInResume.findIndex((item) => item.id === over.id);
                setSectionsInResume((prev) => arrayMove(prev, oldIndex, newIndex));
            } 
           
        } else if (over.id === "section1" && !availableSections.some((item) => item.id === active.id)) {
            // Handle dropping into Section 1
            setAvailableSections((prev) => [...prev, draggedItem]);
            setSectionsInResume((prev) =>
                prev.filter((item) => item.id !== active.id)
            );
        }
    };
    
    
    <DndContext 
    onDragEnd={handleDragEnd}
    collisionDetection={closestCenter}
    modifiers={[restrictToWindowEdges]}
>
    <div className="h-full flex w-full justify-between items-center">
                   
        <div className="h-full w-[60%]  ">

            <div className="h-[20%] w-full flex items-center pl-10">
                <p className="text-2xl font-semibold">
                    <span className="mx-2 text-5xl font-bold">Drag & Drop</span>
                                    sections in the resume
                </p>
            </div>
            <hr />
            <div className="h-[80%] w-full p-4 rounded-lg bg-white shadow-lg "  >
                <Droppable id="section1"  >
                            
                    <div className="flex flex-wrap gap-10 " >

                        {availableSections && availableSections.length>0 && availableSections.map((section) => (
                            <Draggable key={section.id} id={section.id}>
                                <GlossyLiquidEffect section={section} />

                                {/* <motion.div
                                                whileHover={{
                                                    scale: [1, 1.2, 1.1],
                                                    rotate: [0, 3, -3, 0],
                                                }}
                                                whileTap={{
                                                    scale: 0.9,
                                                    rotate: -5,
                                                }}
                                                transition={{
                                                    duration: 0.5,
                                                    type: "spring",
                                                    stiffness: 300,
                                                    damping: 10,
                                                    mass: 0.8,
                                                }}
                                                className="px-8 py-4 rounded-xl m-2 cursor-grab"
                                                style={{
                                                    backgroundColor: section.hex200,
                                                    border: `2px solid ${section.hex600}`
                                                }}
                                            >
                                                <p
                                                    className="text-lg font-semibold tracking-wide"
                                                    style={{ color: section.hex600 }}
                                                >
                                                    {section.name}
                                                </p>
                                            </motion.div> }
                            </Draggable>
                        ))}
                    </div>

                </Droppable>
            </div>
        </div>
                  
        {/* Section 2: Sortable within a Droppable }
        <motion.div
                    
            className="h-full w-[40%] flex items-start justify-center pt-8 "
        >
            <motion.div 
                            
                className="h-[95%] w-[80%] bg-blue-50 rounded-tl-2xl rounded-br-2xl border-blue-700 border-2 shadow-2xl overflow-y-auto overflow-x-hidden custom-scrollbar ">
                <Droppable id="section2"  >
                    <div className="h-[10%] w-full flex items-center justify-center">
                        <p className="text-2xl font-semibold">Resume</p>
                    </div>
                    <div className="w-full p-4 flex flex-col gap-2" >
                        <SortableContext
                            items={sectionsInResume}
                            strategy={verticalListSortingStrategy}
                                        
                        >
                            <div className="flex flex-col">
                                {sectionsInResume.map((section) => (
                                    <SortableItem key={section.id} id={section.id}>
                                        <motion.div
                                            whileHover={{scale:1.1}}
                                            className="px-8 py-4 rounded-xl m-2 cursor-grab bg-blue-200 border border-blue-300 text-blue-900 text-center"
                                        >
                                            <p className="text-lg font-semibold tracking-wide">
                                                {section.name}
                                            </p>
                                        </motion.div>
                                    </SortableItem>
                                ))}
                            </div>
                        </SortableContext>
                    </div>
                </Droppable>
            </motion.div>
        </motion.div>
    </div>
</DndContext>; */}