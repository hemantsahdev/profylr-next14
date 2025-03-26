import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface BasicDetailsProps {
  details: {
    companyName: string
    jobTitle: string
    jobLink: string
    followUpDate: string
    resumeName: string
  }
}

const BasicDetails = ({ details }: BasicDetailsProps) => {
    
    const detailItems = [
        { label: "Company Name", value: details.companyName , id:"companyName" },
        { label: "Job Title", value: details.jobTitle , id:"jobTitle" },
        { label: "Job Link", value: details.jobLink , id:"jobLink" },
        { label: "Follow Up Date", value: details.followUpDate , id:"followUpDate" },
        { label: "Resume Name", value: details.resumeName , id:"resumeName" },
    ];
    
    const handleOpenJobLink =(url:string):void=>{
        window.open(url,"_blank");
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            {/* <h2 className="text-2xl font-semibold mb-4">Basic Details</h2> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {detailItems.map((item, index) => (
                    <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-secondary py-2 px-4 rounded-lg"
                    >
                        <div className="flex items-center justify-between" >
                            <h3 className="text-sm font-bold text-gray-700 ">{item.label}</h3>
                            {item.id === "jobLink" && <button type="button" title="Job Link" onClick={()=> handleOpenJobLink(item.value)} >
                                <ExternalLink size={16} className="hover:text-blue-500 hover:cursor-pointer" />
                            </button>}
                        </div>
                        <p className="text-base">{item.value}</p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default BasicDetails;