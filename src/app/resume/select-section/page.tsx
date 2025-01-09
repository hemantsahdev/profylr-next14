import AvailableSections from "@/components/section-selection/AvailableSections";
import DndKit from "@/components/section-selection/dragDrop/DndKit";
import DragDropSections from "@/components/section-selection/dragDrop/DragDropSections";
import Dummy from "@/components/section-selection/dragDrop/Dummy";
import React from "react";

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
  
  
  
  

const SelectSections = () => {
    return (
        <div className="h-full w-full px-6 pb-4" >
            <div className="h-full w-full rounded-xl px-4" >
                <Dummy/>
            </div>
           
        </div>
    );
};

export default SelectSections;