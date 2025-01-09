"use client";

import { DndContext } from "@dnd-kit/core";
import { arrayMove, horizontalListSortingStrategy, rectSwappingStrategy, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import React, { useState } from "react";
import SortableItem from "./SortableItems";

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
  

const DndKit = () => {

    const [availableSections,setAvailableSections] = useState([
        { id: "header", name: "Header", color: "sky", hex400: "#38bdf8", hex200: "#bae6fd", hex600: "#0284c7" },
        { id: "summary", name: "Summary", color: "lime", hex400: "#a3e635", hex200: "#d9f99d", hex600: "#65a30d" },
        { id: "skills", name: "Skills", color: "orange", hex400: "#fb923c", hex200: "#fed7aa", hex600: "#ea580c" },
        { id: "education", name: "Education", color: "indigo", hex400: "#818cf8", hex200: "#c7d2fe", hex600: "#4f46e5" },
    ]);

    const [sectionsInResume,setSectionsInResume] = useState([ ]);

    
    const handleDragEnd = (event) => {
        const { active, over } = event;
    
        if (!over) return;

        const activeSection = [...availableSections, ...sectionsInResume].find(
            section => section.id === active.id
        );

        // If dropping in the resume section
        if (over.id === "resume-drop-area") {
            if (!sectionsInResume.find(section => section.id === active.id)) {
                setSectionsInResume([...sectionsInResume, activeSection]);
                setAvailableSections(availableSections.filter(section => section.id !== active.id));
            }
        }
        // If dropping in the available section
        else if (over.id === "available-drop-area") {
            if (!availableSections.find(section => section.id === active.id)) {
                setAvailableSections([...availableSections, activeSection]);
                setSectionsInResume(sectionsInResume.filter(section => section.id !== active.id));
            }
        }
        // Reordering within the same list
        else if (active.id !== over.id) {
            const isInResume = sectionsInResume.find(section => section.id === active.id);
      
            if (isInResume) {
                setSectionsInResume(items => {
                    const oldIndex = items.findIndex(item => item.id === active.id);
                    const newIndex = items.findIndex(item => item.id === over.id);
                    return arrayMove(items, oldIndex, newIndex);
                });
            } else {
                setAvailableSections(items => {
                    const oldIndex = items.findIndex(item => item.id === active.id);
                    const newIndex = items.findIndex(item => item.id === over.id);
                    return arrayMove(items, oldIndex, newIndex);
                });
            }
        }
    };

    return (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <div className="h-full w-full flex">
                <div className="h-full w-[60%]">
                    <div className="h-[20%] w-full flex items-center pl-10">
                        <p className="text-2xl font-semibold">
                            <span className="mx-2 text-5xl font-bold">Drag & Drop</span>
              sections you want in your resume
                        </p>
                    </div>

                    <hr />

                    <div className="h-[20%] w-full flex items-center justify-center">
                        <p className="text-2xl font-semibold">Available Sections</p>
                    </div>

                    <div 
                        id="available-drop-area"
                        className="h-[60%] w-full flex flex-wrap p-4"
                    >
                        <SortableContext
                            items={availableSections}
                            strategy={horizontalListSortingStrategy}
                        >
                            {availableSections.map(section => (
                                <SortableItem key={section.id} id={section.id}>
                                    <div
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
                                    </div>
                                </SortableItem>
                            ))}
                        </SortableContext>
                    </div>
                </div>

                <div className="h-full w-[40%] flex items-center justify-center">
                    <div className="h-[95%] w-[70%] bg-white rounded-lg border-gray-400 border-2">
                        <div className="h-[10%] w-full flex items-center justify-center">
                            <p className="text-2xl font-semibold">Resume</p>
                        </div>
                        <hr />
                        <div
                            id="resume-drop-area"
                            className="h-[90%] w-full p-3"
                        >
                            <SortableContext
                                items={sectionsInResume}
                                strategy={verticalListSortingStrategy}
                            >
                                <div className="h-full w-full flex flex-col gap-2 px-4">
                                    {sectionsInResume.map(section => (
                                        <SortableItem key={section.id} id={section.id}>
                                            <div
                                                className="h-16 w-full rounded-xl flex items-center justify-center cursor-grab"
                                                style={{
                                                    backgroundColor: section.hex200,
                                                    border: `2px solid ${section.hex600}`
                                                }}
                                            >
                                                <p
                                                    className="text-xl font-semibold"
                                                    style={{ color: section.hex600 }}
                                                >
                                                    {section.name}
                                                </p>
                                            </div>
                                        </SortableItem>
                                    ))}
                                </div>
                            </SortableContext>
                        </div>
                    </div>
                </div>
            </div>
        </DndContext>
    );
    
};

export default DndKit;