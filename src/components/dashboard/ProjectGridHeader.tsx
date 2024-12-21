"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import JobApplicationDialog from "../job-application/job-details-dailog/JobApplicationDialog";

const ProjectGridHeader = () => {

    const router = useRouter();
    const [dialogOpen, setDialogOpen] = useState(false);


    const handleNewJobNavigate = ():void=>{
        router.push("/job-application/create");
    };


    const toggleDialog = ()=>{
        setDialogOpen(prev=>!prev);
    };
    return (
        <div className="h-full w-full flex items-center justify-between ">
            <div className="h-full flex items-center pl-8">
                <h2 className="text-xl font-semibold tracking-tight text-black">Job Tracking</h2>
            </div>
            <div className="flex items-center pr-8 ">
                {/* <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search projects..." className="pl-8 bg-gray-900 border-gray-800" />
                </div> */}
                <Button className="bg-indigo-900 hover:bg-purple-500 gap-2 "  onClick={handleNewJobNavigate} size={"sm"} >
                    <Plus size={20} />
                  New Job Tracking
                </Button>
                <Button onClick={() => setDialogOpen(true)} size={"sm"} >Open Job Application Details</Button>
                <JobApplicationDialog open={dialogOpen} toggleDialog={toggleDialog} />
            </div>
        </div>
    );
};

export default ProjectGridHeader;