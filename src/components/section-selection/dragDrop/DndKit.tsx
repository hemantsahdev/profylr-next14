import { DndContext } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import React, { useState } from "react";
import SortableItems from "./SortableItems";

const resumeSections = [
    { name: "Header", color: "sky", hex400: "#38bdf8", hex200: "#bae6fd", hex600: "#0284c7" },
    { name: "Summary", color: "lime", hex400: "#a3e635", hex200: "#d9f99d", hex600: "#65a30d" },
    { name: "Skills", color: "orange", hex400: "#fb923c", hex200: "#fed7aa", hex600: "#ea580c" },
    { name: "Education", color: "indigo", hex400: "#818cf8", hex200: "#c7d2fe", hex600: "#4f46e5" },
    { name: "Work Experience", color: "emerald", hex400: "#4ade80", hex200: "#a7f3d0", hex600: "#16a34a" },
    { name: "Projects", color: "violet", hex400: "#a78bfa", hex200: "#ddd6fe", hex600: "#7c3aed" },
    { name: "Certifications", color: "pink", hex400: "#f472b6", hex200: "#fbcfe8", hex600: "#db2777" },
    { name: "Awards", color: "teal", hex400: "#2dd4bf", hex200: "#a5f3fc", hex600: "#0d9488" },
    { name: "Languages", color: "amber", hex400: "#facc15", hex200: "#fde68a", hex600: "#ca8a04" },
    { name: "Hobbies", color: "rose", hex400: "#fb7185", hex200: "#fecdd3", hex600: "#e11d48" },
    { name: "Publications", color: "cyan", hex400: "#22d3ee", hex200: "#a5f3fc", hex600: "#0891b2" },
    { name: "Volunteer Experience", color: "purple", hex400: "#c084fc", hex200: "#e9d5ff", hex600: "#9333ea" },
    { name: "References", color: "red", hex400: "#f87171", hex200: "#fecaca", hex600: "#dc2626" }
];
  

const DndKit = () => {

    const [sections,setSections] = useState([
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


    return (
        <DndContext onDragEnd={handleDragEnd} >
            <SortableContext 
                items={sections}
                strategy={verticalListSortingStrategy}
            >
                <div className="flex flex-col gap-8" >

                    {sections.map(section =>
                        <SortableItems key={section.id} id={section.id} >
                            <button 
                                className=" inline-block px-8 py-4 rounded-xl border-2 border-gray-600 mx-[1px] my-[1px] cursor-grab " 
                                style={{backgroundColor:`${section.hex200 }`,border: `1px solid ${section.hex600}` }} >
                                <p className="text-lg font-semibold  tracking-wide " style={{color:`${section.hex600}`}} >{section.name}</p>
                            </button>
                        </SortableItems> )}
                </div>
            </SortableContext>
        </DndContext>
    );

    function handleDragEnd (event) {
        const {active, over} = event;
        
        if (active.id !== over.id) {
            setSections((items) => {
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over.id);
            
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }
};

export default DndKit;