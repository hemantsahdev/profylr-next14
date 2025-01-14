import FillResumeDetails from "@/components/fill-resume-details/FillResumeDetails";
import React from "react";

const FillDetailsLayout = () => {
    return (
        <div className="h-full w-full flex flex-col pb-4 px-12 ">
            <div className="h-[10%] flex items-center justify-start " >
                <h1 className="text-3xl font-semibold" >Fill Your Resume Details</h1>
            </div>
            <div className="flex-1" >
                <FillResumeDetails/>
            </div>
        </div>

    );
};

export default FillDetailsLayout;