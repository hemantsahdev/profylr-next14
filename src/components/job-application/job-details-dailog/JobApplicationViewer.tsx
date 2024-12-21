import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import BasicDetails from "./BasicDetails";
import StatusTrajectory from "./StatusTrajectory";
import MiscEvents from "./MiscEvents";
import NotesSection from "./NotesSection";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";

interface JobApplication {
    id:string,
    details: {
      companyName: string
      jobTitle: string
      jobLink: string
      followUpDate: string
      resumeName: string
    }
    statuses: {
      status: string
      date: string
    }[]
    miscEvents: {
      id: number
      title: string
      description: string
      createdAt: string
      updatedAt: string
    }[]
    notes: string
  }

const JobApplicationViewer = ({ jobApplication }: { jobApplication: JobApplication }) => {

    const router = useRouter()

    const handleJobEdit = ()=>{
        router.push(`/job-application/edit/${jobApplication.id}`)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-12 w-full"
        >
            <Card>
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold mb-6">Job Application Details</h1>
                        <button title="Edit Job" onClick={handleJobEdit} >
                            <Edit/>
                        </button>
                    </div>
                    <BasicDetails details={jobApplication.details} />
                </CardContent>
            </Card>
        
            <StatusTrajectory statuses={jobApplication.statuses} />
        
            <MiscEvents events={jobApplication.miscEvents} />
        
            <NotesSection notes={jobApplication.notes} />
        </motion.div>
    );
};

export default JobApplicationViewer;