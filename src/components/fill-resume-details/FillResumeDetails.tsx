import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalInfo from "./sections/PersonalInfo.resume";
import Summary from "./sections/Summary.resume";
import Education from "./sections/Education.resume";
import TechnicalSkills from "./sections/TechnicalSkills.resume";
import Projects from "./sections/Projects.resume";
import WorkExperiences from "./sections/WorkExperiences.resume";
import Certifications from "./sections/Certifications.resume";
import AchievementsAndAwards from "./sections/AchievementsAndAwards.resume";
import ExtraCurricualrActivities from "./sections/ExtraCurricualrActivities.resume";
import PublicationsAndResearch from "./sections/PublicationsAndResearch.resume";
import LanguagesKnown from "./sections/LanguagesKnown.resume";

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
            <TabsList className="h-[4.5rem] w-full overflow-y-auto custom-scrollbar  rounded-2xl ">
                {headings &&
        headings.map((heading) => (
            <TabsTrigger
                key={heading.value}
                value={heading.value}
                className="h-12  text-gray-800  hover:text-themePurple tracking-wide data-[state=active]:bg-themeLightPurple data-[state=active]:text-themePurple font-semibold rounded-md transition-all"
            >
                {heading.label}
            </TabsTrigger>
        ))}
            </TabsList>

            <TabsContent value="personalInfo" className="h-[calc(100%-5rem)] " > <PersonalInfo /> </TabsContent>
            <TabsContent value="summary"> <Summary /> </TabsContent>
            <TabsContent value="education"> <Education /> </TabsContent>
            <TabsContent value="technicalSkills"> <TechnicalSkills /> </TabsContent>
            <TabsContent value="projects"> <Projects /> </TabsContent>
            <TabsContent value="workExperiences"> <WorkExperiences /> </TabsContent>
            <TabsContent value="certifications"> <Certifications /> </TabsContent>
            <TabsContent value="achievementsAndAwards"> <AchievementsAndAwards /> </TabsContent>
            <TabsContent value="extraCurricularActivities"> <ExtraCurricualrActivities /> </TabsContent>
            <TabsContent value="publicationsAndResearch"> <PublicationsAndResearch /> </TabsContent>
            <TabsContent value="languagesKnown"> <LanguagesKnown /> </TabsContent>
        </Tabs>

    );
};

export default FillResumeDetails;