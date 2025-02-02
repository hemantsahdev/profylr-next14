import AllSections from "@/components/admin/resume-sections/AllSections";
import CreateResumeSection from "@/components/admin/resume-sections/CreateResumeSection";
import React from "react";

const ResumeSectionsAdmin = () => {
    return (
        <div className="h-full w-full  p-6" >
            <div className="h-[8%]" >
                <h1 className=" text-2xl text-center font-bold " >Resume Sections</h1>
            </div>
            <div className="h-[92%] w-full flex bg-white rounded-xl shadow-lg ">
                <div className="w-[60%] h-full p-5" >
                    <div className="h-[10%]" > 
                        <h3 className="text-xl text-center font-semibold " >Create Resume Section</h3>
                    </div>
                    <div className="h-[90%] flex items-center justify-center ">
                        <CreateResumeSection/>
                    </div>
                </div>
                <div className="w-[40%] h-full" >
                    <div className="h-[10%]  flex items-center justify-center  " > 
                        <h3 className="text-xl  font-semibold " >All Resume Sections</h3>
                    </div>
                    <div className="h-[90%]">
                        <AllSections/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeSectionsAdmin;