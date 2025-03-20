import CreateResumeTemplate from "@/components/admin/resume-templates/CreateResumeTemplate";
import React from "react";

const ResumeTemplateAdmin = () => {
    return (
        <div className="h-full w-full p-6 " >
           
            <div className="h-[100%] w-full flex flex-col " >
                <CreateResumeTemplate/>
            </div>
        </div>
    );
};

export default ResumeTemplateAdmin;