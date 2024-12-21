import { Edit, Info, Pin, Trash2 } from "lucide-react";
import React, { useState } from "react";
import JobApplicationDialog from "../job-details-dailog/JobApplicationDialog";

const JobPopovers = () => {

    const [showJobDetailsDialog, setShowJobDetailsDialog] = useState(false);

    const handleSelectedOption = (type:string):void=>{
        switch (type) {
        case "pin":
            toggleJobDetailsDialog();
            break;
            
        default:
            break;
        }
    };

    const toggleJobDetailsDialog = ():void=>{
        setShowJobDetailsDialog(true);
    };

    return (
        <div className="h-full w-full" >
            <div className=" flex flex-col gap-2 p-3">

                <button 
                    type="button" 
                    className="flex items-center gap-2 text-gray-600 hover:text-amber-700"
                    onClick={()=>handleSelectedOption("pin")}
                >
                    <Pin className="w-4 h-4 text-amber-600" />
                    <span>Pin</span>
                </button>

                {/* Details Option */}
                <button type="button"  className="flex items-center gap-2 text-gray-600 hover:text-blue-500">
                    <Info className="w-4 h-4 text-blue-600" />
                    <span>Details</span>
                </button>
                {/* Edit Option */}
                <button type="button"  className="flex items-center gap-2 text-gray-600 hover:text-green-500">
                    <Edit className="w-4 h-4 text-green-600" />
                    <span>Edit</span>
                </button>
                {/* Delete Option */}
                <button type="button"  className="flex items-center gap-2 text-gray-600 hover:text-red-500">
                    <Trash2 className="w-4 h-4 text-red-600" />
                    <span>Delete</span>
                </button>
            </div>
            <JobApplicationDialog open={showJobDetailsDialog} toggleDialog={toggleJobDetailsDialog} />
        </div>

    );
};

export default JobPopovers;