"use client";

import JobApplicationForm from "@/components/job-application/create/JobApplicationForm";
import { useRouter } from "next/navigation";


const Create = () => {

    return (
        <div className="h-full w-full flex items-center justify-center  " >
            <JobApplicationForm isEditMode={false} jobId="" />
        </div>
    );
};

export default Create;