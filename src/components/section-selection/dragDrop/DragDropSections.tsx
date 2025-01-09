"use client";

import React, { useState } from "react";
import {closestCenter, DndContext} from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy} from "@dnd-kit/sortable";
import Draggable from "./Draggable";
import Droppable from "./Droppable";
import SortableItems from "./SortableItems";

// const resumeSections = [
//     { id: "header", name: "Header", color: "sky", hex400: "#38bdf8", hex200: "#bae6fd", hex600: "#0284c7" },
//     { id: "summary", name: "Summary", color: "lime", hex400: "#a3e635", hex200: "#d9f99d", hex600: "#65a30d" },
//     { id: "skills", name: "Skills", color: "orange", hex400: "#fb923c", hex200: "#fed7aa", hex600: "#ea580c" },
//     { id: "education", name: "Education", color: "indigo", hex400: "#818cf8", hex200: "#c7d2fe", hex600: "#4f46e5" },
//     { id: "work-experience", name: "Work Experience", color: "emerald", hex400: "#4ade80", hex200: "#a7f3d0", hex600: "#16a34a" },
//     { id: "projects", name: "Projects", color: "violet", hex400: "#a78bfa", hex200: "#ddd6fe", hex600: "#7c3aed" },
//     { id: "certifications", name: "Certifications", color: "pink", hex400: "#f472b6", hex200: "#fbcfe8", hex600: "#db2777" },
//     { id: "awards", name: "Awards", color: "teal", hex400: "#2dd4bf", hex200: "#a5f3fc", hex600: "#0d9488" },
//     { id: "languages", name: "Languages", color: "amber", hex400: "#facc15", hex200: "#fde68a", hex600: "#ca8a04" },
//     { id: "hobbies", name: "Hobbies", color: "rose", hex400: "#fb7185", hex200: "#fecdd3", hex600: "#e11d48" },
//     { id: "publications", name: "Publications", color: "cyan", hex400: "#22d3ee", hex200: "#a5f3fc", hex600: "#0891b2" },
//     { id: "volunteer-experience", name: "Volunteer Experience", color: "purple", hex400: "#c084fc", hex200: "#e9d5ff", hex600: "#9333ea" },
//     { id: "references", name: "References", color: "red", hex400: "#f87171", hex200: "#fecaca", hex600: "#dc2626" }
// ];
    

const DragDropSections = () => {

    const [items, setItems] = useState([1, 2, 3]);


    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>

            <SortableContext 
                items={items}
                strategy={verticalListSortingStrategy}
            >
                <div className="flex flex-col gap-8" >

                    {items.map(id =>
                        <SortableItems key={id} id={id} >
                            <div className="h-[6rem] w-[10rem] bg-red-300 " >
                                Hello
                            </div>
                        </SortableItems> )}
                </div>
            </SortableContext>
           
        </DndContext>
    );

    function handleDragEnd(event) {
        const {active, over} = event;
        
        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over.id);
            
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }
};

export default DragDropSections;