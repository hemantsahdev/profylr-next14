import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import JobDetails from "./JobApplicationViewer";


const jobApplicationData = {
    id:"123",
    details: {
        companyName: "TechCorp Inc.",
        jobTitle: "Senior Frontend Developer",
        jobLink: "https://techcorp.com/jobs/senior-frontend-developer",
        followUpDate: "2023-06-15",
        resumeName: "John_Doe_Resume_2023.pdf"
    },
    statuses: [
        { status: "Applied", date: "2023-05-01" },
        { status: "In Progress", date: "2023-05-10" },
        { status: "Interview Scheduled", date: "2023-05-20" },
        { status: "Offer Received", date: "2023-06-01" },
    ],
    miscEvents: [
        {
            id: 1,
            title: "Phone Screening",
            description: "30-minute call with HR representative",
            createdAt: "2023-05-05T10:00:00Z",
            updatedAt: "2023-05-05T10:30:00Z"
        },
        {
            id: 2,
            title: "Technical Interview",
            description: "2-hour technical interview with the engineering team",
            createdAt: "2023-05-15T14:00:00Z",
            updatedAt: "2023-05-15T16:00:00Z"
        },
        {
            id: 3,
            title: "Culture Fit Interview",
            description: "1-hour interview with the team lead",
            createdAt: "2023-05-25T11:00:00Z",
            updatedAt: "2023-05-25T12:00:00Z"
        }
    ],
    notes: "- Remember to ask about remote work policy\n- Highlight experience with React and TypeScript\n- Inquire about professional development opportunities"
};
  
const JobApplicationDialog = ({open,toggleDialog}:{open:boolean,toggleDialog:()=>void}) => {

    return (
        <Dialog open={open} onOpenChange={toggleDialog}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
               
                <div className="space-y-6 w-full">
                    <JobDetails jobApplication={jobApplicationData} />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default JobApplicationDialog;