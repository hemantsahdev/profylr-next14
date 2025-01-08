import AvailableSections from "@/components/section-selection/AvailableSections";
import DragDropSections from "@/components/section-selection/dragDrop/DragDropSections";
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
            <div className="h-full w-full bg-gray-50 rounded-xl px-4" >
               
                <div className="h-full w-full flex " >
                  
                    <div className="h-full w-[60%] " >
                        {/* header */}
                        <div className="h-[20%] w-full  flex items-center pl-10 " >
                            <p className="text-2xl font-semibold"> <span className="mx-2 text-5xl font-bold" >Drag & Drop</span>  sections you want in your resume</p>
                        </div>

                        <hr />

                        <div className="h-[20%] w-full  flex items-center justify-center ">
                            <p className="text-2xl font-semibold" >Resume Sections</p>
                        </div>

                        <div className="h-[60%] w-full  " >

                            {resumeSections.map((section,idx)=>(
                                <>
                                    {/* Brick */}
                                    <button 
                                        className=" inline-block px-8 py-4 rounded-xl border-2 border-gray-600 mx-[1px] my-[1px] cursor-grab " 
                                        style={{backgroundColor:`${section.hex200 }`,border: `1px solid ${section.hex600}` }} >
                                        <p className="text-lg font-semibold  tracking-wide " style={{color:`${section.hex600}`}} >{section.name}</p>
                                    </button>
                                </>
                            ))}
                           
                        </div>

                    </div>

                    <div className="h-full w-[40%] flex items-center justify-center " >
                        <div className="h-[95%] w-[70%] bg-white rounded-lg  border-gray-400 border-2 " >
                            <div className="h-[10%] w-full flex items-center justify-center ">
                                <p className="text-2xl font-semibold" >Resume</p>
                            </div>
                            <hr />
                            <div className="h-[90%] w-full  p-3 " >
                                <div className="h-full w-full  flex flex-col gap-1 px-4 " >

                                    { [1,2,3,4].map(e=>(
                                        <>
                                            {/* strip */}
                                            <div className="h-[4rem] w-full bg-green-200  border-2 border-green-800 rounded-xl flex items-center justify-center" >
                                                <p className="text-xl font-semibold " >Header</p>
                                            </div>
                                        </>

                                    )) } 
                                   
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
           
        </div>
    );
};

export default SelectSections;