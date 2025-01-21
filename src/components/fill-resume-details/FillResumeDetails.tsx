import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalInfo from "./sections/PersonalInfo.resume";
import Summary from "./sections/Summary.resume";
import Education from "./sections/Education.resume";
import WorkExperiences from "./sections/WorkExperiences.resume";
import Certifications from "./sections/Certifications.resume";
import AchievementsAndAwards from "./sections/AchievementsAndAwards.resume";
import ExtraCurricualrActivities from "./sections/ExtraCurricualrActivities.resume";
import PublicationsAndResearch from "./sections/PublicationsAndResearch.resume";
import LanguagesKnown from "./sections/LanguagesKnown.resume";
import Projects  from "./sections/project/Projects.resume";
import Skills from "./sections/Skills.resume";

const headings = [
    { value: "personalInfo", label: "Personal Info" },
    { value: "summary", label: "Summary" },
    { value: "education", label: "Education" },
    { value: "technicalSkills", label: "Technical Skills" },
    { value: "projects", label: "Projects" },
    { value: "workExperiences", label: "Work Experiences" },
    { value: "certifications", label: "Certifications" },
    { value: "achievementsAndAwards", label: "Achievements And Awards" },
    { value: "extraCurricularActivities", label: "Extra Curricular Activities" },
    // { value: "publicationsAndResearch", label: "Publications And Research" },
    // { value: "languagesKnown", label: "Languages Known" }
];
  
  
const FillResumeDetails = () => {
    return (
        <Tabs defaultValue="personalInfo" className="w-full h-full ">
            <TabsList className="h-[4.5rem] w-full overflow-y-auto custom-scrollbar bg-white  rounded-2xl ">
                {headings &&
        headings.map((heading) => (
            <TabsTrigger
                key={heading.value}
                value={heading.value}
                className="h-12  text-gray-800 px-4  hover:text-themePurple tracking-wide data-[state=active]:bg-themeLightPurple data-[state=active]:text-themePurple/80
                data-[state=active]:rounded-2xl data-[state=active]:shadow-lg  font-semibold rounded-md transition-all"
            >
                {heading.label}
            </TabsTrigger>
        ))}
            </TabsList>

            <TabsContent value="personalInfo" className="h-[calc(100%-5rem)] " > <PersonalInfo /> </TabsContent>
            <TabsContent value="summary" className="h-[calc(100%-5rem)] " > <Summary /> </TabsContent>
            <TabsContent value="education" className="h-[calc(100%-5rem)] "> <Education /> </TabsContent>
            <TabsContent value="technicalSkills" className="h-[calc(100%-5rem)] "> <Skills /> </TabsContent>
            <TabsContent value="projects" className="h-[calc(100%-5rem)] " > <Projects /> </TabsContent>
            <TabsContent value="workExperiences" className="h-[calc(100%-5rem)] "> <WorkExperiences /> </TabsContent>
            <TabsContent value="certifications" className="h-[calc(100%-5rem)] "> <Certifications /> </TabsContent>
            <TabsContent value="achievementsAndAwards" className="h-[calc(100%-5rem)] "> <AchievementsAndAwards /> </TabsContent>
            <TabsContent value="extraCurricularActivities" className="h-[calc(100%-5rem)] "> <ExtraCurricualrActivities /> </TabsContent>
            <TabsContent value="publicationsAndResearch" className="h-[calc(100%-5rem)] "> <PublicationsAndResearch /> </TabsContent>
            <TabsContent value="languagesKnown" className="h-[calc(100%-5rem)] "> <LanguagesKnown /> </TabsContent>
        </Tabs>

    );
};

export default FillResumeDetails;