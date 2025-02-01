import CreateResumeSection from "@/components/admin/resume-sections/CreateResumeSection";
import React from "react";

const ResumeSectionsAdmin = () => {
    return (
        <div className="h-full w-full bg-red-300 p-6" >
            <div className="h-[8%]" >
                <h1 className=" text-2xl text-center font-bold " >Resume Sections</h1>
            </div>
            <div className="h-[92%] w-full flex bg-white rounded-xl shadow-lg ">
                <div className="w-[60%] h-full p-5" >
                    <h3 className="text-xl font-semibold " >Create Resume Section</h3>
                    <div>
                        <CreateResumeSection/>
                    </div>
                </div>
                <div className="w-[40%] h-full bg-blue-200" >

                </div>
            </div>
        </div>
    );
};

export default ResumeSectionsAdmin;