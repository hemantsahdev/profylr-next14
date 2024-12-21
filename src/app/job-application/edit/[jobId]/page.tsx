"use client"

import JobApplicationForm from "@/components/job-application/create/JobApplicationForm";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const EditJobId = () => {

    const router = useRouter();
    // const {id} = router.query;
    useEffect(()=>{
        console.log(router)
    },[router])
    return (
        <div className="h-full w-full flex items-center justify-center  " >
      {/* {id && (
            <JobApplicationForm isEditMode={true} jobId={id} />
      )}  */}
    </div>
    );
};

export default EditJobId;