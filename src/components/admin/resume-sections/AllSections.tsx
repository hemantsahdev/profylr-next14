import React from "react";
import SectionInfoCard from "./SectionInfoCard";

const sections = [
    {
        sectionName: "Software Development",
        description: "Covers topics related to software engineering and programming.",
        categories: ["Frontend", "Backend", "DevOps"],
        departments: ["Engineering", "Technology"]
    },
    {
        sectionName: "Marketing",
        description: "Focuses on digital and traditional marketing strategies.",
        categories: ["SEO", "Content Marketing", "Advertising"],
        departments: ["Sales", "Marketing"]
    },
    {
        sectionName: "Human Resources",
        description: "Includes policies, recruitment, and employee engagement.",
        categories: ["Recruitment", "Employee Benefits", "Workplace Culture"],
        departments: ["HR", "Administration"]
    },
    {
        sectionName: "Finance",
        description: "Covers financial planning, budgeting, and investments.",
        categories: ["Accounting", "Taxation", "Investments"],
        departments: ["Finance", "Accounting"]
    },
    {
        sectionName: "Finance",
        description: "Covers financial planning, budgeting, and investments.",
        categories: ["Accounting", "Taxation", "Investments"],
        departments: ["Finance", "Accounting"]
    },
    {
        sectionName: "Finance",
        description: "Covers financial planning, budgeting, and investments.",
        categories: ["Accounting", "Taxation", "Investments"],
        departments: ["Finance", "Accounting"]
    }
];

const AllSections = () => {

    return (
        <div className="h-full w-full" >
            <div className="h-full space-y-4 px-6 overflow-y-auto custom-scrollbar " >
                {sections.map((s,idx)=>(
                    <SectionInfoCard
                        key={idx}
                        sectionName={s.sectionName}
                        description={s.description}
                        categories={s.categories}
                        departments={s.departments}
                    />
                ))}
            </div>
        </div>
    );
};

export default AllSections;