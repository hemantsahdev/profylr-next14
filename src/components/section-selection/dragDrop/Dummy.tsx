"use client";

import { closestCenter, DndContext } from "@dnd-kit/core";
import React, { useState } from "react";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Droppable from "./Droppable";
import Draggable from "./Draggable";

const Dummy = () => {

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
        //         active: Contains info about the item being dragged
        // over: Contains info about the drop target
        try {
            // 1. Basic validation
            const { active, over } = event;
            if (!over) return;
    
            // 2. Find dragged item
            const activeSection = [...availableSections, ...sectionsInResume].find(
                section => section.id === active.id
            );
            if (!activeSection) return;
    
            // 3. Handle different drop zones
            if (over.id === "resume-drop-area") {
                if (!sectionsInResume.find(section => section.id === active.id)) {
                    setSectionsInResume(current => [...current, activeSection]);
                    setAvailableSections(current => 
                        current.filter(section => section.id !== active.id)
                    );
                }
            } 
            else if (over.id === "available-sections-area") {
                if (!availableSections.find(section => section.id === active.id)) {
                    setAvailableSections(current => [...current, activeSection]);
                    setSectionsInResume(current => 
                        current.filter(section => section.id !== active.id)
                    );
                }
            }

            // 4. Handle reordering
            // else if (active.id !== over.id) {
            //     const isInResume = sectionsInResume.find(
            //         section => section.id === active.id
            //     );
                
            //     if (isInResume) {
            //         setSectionsInResume(items => {
            //             const oldIndex = items.findIndex(
            //                 item => item.id === active.id
            //             );
            //             const newIndex = items.findIndex(
            //                 item => item.id === over.id
            //             );
            //             return arrayMove(items, oldIndex, newIndex);
            //         });
            //     } else {
            //         setAvailableSections(items => {
            //             const oldIndex = items.findIndex(
            //                 item => item.id === active.id
            //             );
            //             const newIndex = items.findIndex(
            //                 item => item.id === over.id
            //             );
            //             return arrayMove(items, oldIndex, newIndex);
            //         });
            //     }
            // }
        } catch (error) {
            console.error("Error in drag end:", error);
        }
    };

    return (

        <DndContext  onDragEnd={handleDragEnd}  >

            <div className="h-full w-full flex">

                <div className="h-full w-[60%]  ">
                    <div className="h-[20%] w-full flex items-center pl-10">
                        <p className="text-2xl font-semibold">
                            <span className="mx-2 text-5xl font-bold">Drag & Drop</span>
                                    sections in the resume
                        </p>
                    </div>
                    <hr />
                    <div className="h-[80%] w-full p-4 rounded-lg bg-amber-50 shadow-lg "  >
                        <Droppable  id="available-sections-area"  >
                            <div className="h-[20%] w-full flex items-center justify-center">
                                <p className="text-2xl font-semibold">Available Sections</p>
                            </div>
                      
                            <div className="flex flex-wrap " >
                                {availableSections.map(section=>
                                    <Draggable  key={section.id} id={section.id} >
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
                                    </Draggable>

                                )}
                            </div>
                        </Droppable>
                    </div>

                </div>
                <div className="h-full w-[40%] flex items-start justify-center pt-8">
                    <div className="h-[95%] w-[70%] bg-white rounded-lg border-gray-400 border-2 shadow-2xl ">
                        <Droppable  id="resume-drop-area" >
                            <div className="h-[10%] w-full flex items-center justify-center">
                                <p className="text-2xl font-semibold">Resume</p>
                            </div>
                            <hr />
                            <div className="w-full p-4 flex flex-col gap-2" >
                                {sectionsInResume && sectionsInResume.length>0 && sectionsInResume.map(section=>
                                    <Draggable  key={section.id} id={section.id} >
                                        <div
                          
                                            className="px-8 py-4 rounded-xl m-2 cursor-grab bg-green-200 "
                                        >
                                            <p className="text-lg font-semibold tracking-wide">
                                                {section.name}
                                            </p>
                                        </div>
                                    </Draggable>

                                )}
                            </div>
                        </Droppable>
                    </div>
                   
                </div>
            </div>


        </DndContext>
    );
};

export default Dummy;