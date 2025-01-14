"use client";

import { closestCenter, DndContext } from "@dnd-kit/core";
import React, { useState } from "react";
import {restrictToWindowEdges } from "@dnd-kit/modifiers";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import {motion} from "framer-motion";
import Droppable from "./dragDrop/Droppable";
import SortableItem from "./dragDrop/SortableItem";
import Draggable from "./dragDrop/Draggable";

const SectionSelection = () => {

    const [availableSections, setAvailableSections] = useState([
        { id: "header", name: "Header", color: "sky", hex400: "#38bdf8", hex200: "#bae6fd", hex600: "#0284c7" },
        { id: "summary", name: "Summary", color: "lime", hex400: "#a3e635", hex200: "#d9f99d", hex600: "#65a30d" },
        { id: "skills", name: "Skills", color: "orange", hex400: "#fb923c", hex200: "#fed7aa", hex600: "#ea580c" },
        { id: "education", name: "Education", color: "indigo", hex400: "#818cf8", hex200: "#c7d2fe", hex600: "#4f46e5" },
        { id: "work-experience", name: "Work Experience", color: "emerald", hex400: "#4ade80", hex200: "#a7f3d0", hex600: "#16a34a" },
        { id: "projects", name: "Projects", color: "violet", hex400: "#a78bfa", hex200: "#ddd6fe", hex600: "#7c3aed" },
        { id: "certifications", name: "Certifications", color: "pink", hex400: "#f472b6", hex200: "#fbcfe8", hex600: "#db2777" },
        { id: "awards", name: "Awards", color: "teal", hex400: "#2dd4bf", hex200: "#a5f3fc", hex600: "#0d9488" },
        { id: "languages", name: "Languages", color: "amber", hex400: "#facc15", hex200: "#fde68a", hex600: "#ca8a04" },
        { id: "hobbies", name: "Hobbies", color: "rose", hex400: "#fb7185", hex200: "#fecdd3", hex600: "#e11d48" },
        { id: "publications", name: "Publications", color: "cyan", hex400: "#22d3ee", hex200: "#a5f3fc", hex600: "#0891b2" },
        { id: "volunteer-experience", name: "Volunteer Experience", color: "purple", hex400: "#c084fc", hex200: "#e9d5ff", hex600: "#9333ea" },
        { id: "references", name: "References", color: "red", hex400: "#f87171", hex200: "#fecaca", hex600: "#dc2626" }
    ]);

    const [sectionsInResume,setSectionsInResume] = useState([]);

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

    return (
        <section className="h-full w-full" >
            <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter} modifiers={[restrictToWindowEdges]}>
                <div className="h-full flex w-full justify-between items-center">
                    <div className="h-full w-[60%]  ">

                        <div className="h-[20%] w-full flex items-center pl-10">
                            <p className="text-2xl font-semibold">
                                <span className="mx-2 text-5xl font-bold">Drag & Drop</span>
                                    sections in the resume
                            </p>
                        </div>
                        <hr />
                        <div className="h-[80%] w-full p-4 rounded-lg bg-amber-50 shadow-lg "  >
                            <Droppable id="section1"  >
                                <div className="h-[20%] w-full flex items-center justify-center">
                                    <p className="text-2xl font-semibold">Available Sections</p>
                                </div>
                                <div className="flex flex-wrap " >

                                    {availableSections && availableSections.length>0 && availableSections.map((section) => (
                                        <Draggable key={section.id} id={section.id}>
                                            <motion.div
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
                                            </motion.div>
                                        </Draggable>
                                    ))}
                                </div>

                            </Droppable>
                        </div>
                    </div>
                  
                  
                    {/* Section 2: Sortable within a Droppable */}
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
            </DndContext>
        </section>
    );
};

export default SectionSelection;