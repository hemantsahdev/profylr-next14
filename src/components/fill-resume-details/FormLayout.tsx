"use client";

import React, { useEffect } from "react";
import { useFormContext } from "@/context/FormContext";
import { useFormProgress } from "@/hooks/useFormProgress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Save, CheckCircle, ArrowRight, Wand2 } from "lucide-react";
import Link from "next/link";
import { FormNavigation } from "./FormNavigation";
import { ProjectsTab } from "./tabs/ProjectsTab";
import { EducationTab } from "./tabs/EducationTab";
import { TechnicalSkillsTab } from "./tabs/SkillsTabs";
import { WorkExperiencesTab } from "./tabs/WorkExperiencesTab";
import { CertificationsTab } from "./tabs/CertificationsTab";
import { AchievementsTab } from "./tabs/AchievementsTab";
import { SummaryTab } from "./tabs/SummaryTab";
import { ExtraCurricularTab } from "./tabs/ExtraCurricular";
import { PersonalInfoTab } from "./tabs/PersonalInfoTab";

export const FormLayout = () => {
    const { activeTab, saveForm, isDirty, fillWithDummyData } = useFormContext();
    const { progress, color, badge } = useFormProgress();

    // Save with keyboard shortcut (Ctrl/Cmd + S)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "s") {
                e.preventDefault();
                saveForm();
            }
        };
    
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [saveForm]);

    useEffect(() => {
        console.log(progress);
        console.log(color);
    }, [progress, color]);

    return (
        <div className="min-h-screen bg-dot-pattern pb-20">
            <header className="sticky top-0 z-10 backdrop-blur-md bg-background/80 border-b border-border">
                <div className="container mx-auto py-4 px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-medium tracking-tight">Resume Builder</h1>
                        <p className="text-muted-foreground text-sm">
              Fill out your resume details to create a professional CV
                        </p>
                    </div>
          
                    <div className="flex items-center gap-3">
                        <Badge variant="outline" className={`${badge.color} transition-colors duration-300`}>
                            {badge.label}
                        </Badge>
            
                        <Button
                            variant="outline"
                            className="gap-2"
                            onClick={saveForm}
                            disabled={!isDirty}
                        >
                            {isDirty ? (
                                <>
                                    <Save size={16} />
                  Save
                                </>
                            ) : (
                                <>
                                    <CheckCircle size={16} />
                  Saved
                                </>
                            )}
                        </Button>
            
                        <Button 
                            variant="secondary" 
                            className="gap-2"
                            onClick={fillWithDummyData}
                        >
                            <Wand2 size={16} />
              Fill with Dummy Data
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 sm:px-6 py-8">
                <div className="flex gap-8 max-w-7xl mx-auto">
                    {/* Vertical Form navigation */}
                    <div className="hidden md:block sticky top-28 self-start">
                        <FormNavigation />
                    </div>
          
                    <div className="flex-1 flex flex-col space-y-8">
                        {/* Progress bar */}
                        <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
                            <div 
                                className={`h-full ${color} transition-all duration-500 ease-in-out`}
                                style={{ width: `${progress}%` , backgroundColor: color }}
                            />
                        </div>
            
                        {/* Horizontal navigation on mobile */}
                        <div className="md:hidden">
                            <FormNavigation />
                        </div>
            
                        {/* Form content */}
                        <div className="bg-card rounded-xl card-shadow p-6 animate-fade-in">
                            {activeTab === "personal-info" && <PersonalInfoTab />}
                            {activeTab === "summary" && <SummaryTab />}
                            {activeTab === "projects" && <ProjectsTab />}
                            {activeTab === "education" && <EducationTab />}
                            {activeTab === "technical-skills" && <TechnicalSkillsTab />}
                            {activeTab === "work-experiences" && <WorkExperiencesTab />}
                            {activeTab === "certifications" && <CertificationsTab />}
                            {activeTab === "achievements-awards" && <AchievementsTab />}
                            {activeTab === "extra-curricular" && <ExtraCurricularTab />}
              
                            {/* Placeholder for tabs that haven't been implemented yet */}
                            {activeTab !== "personal-info" && 
               activeTab !== "summary" && 
               activeTab !== "projects" && 
               activeTab !== "education" && 
               activeTab !== "technical-skills" && 
               activeTab !== "work-experiences" &&
               activeTab !== "certifications" &&
               activeTab !== "achievements-awards" &&
               activeTab !== "extra-curricular" && (
                                <div className="py-20 text-center text-muted-foreground">
                                    <Loader2 className="h-8 w-8 mx-auto mb-4 animate-spin" />
                                    <p>This section is coming soon...</p>
                                </div>
                            )}
              
                            <div className="flex justify-end mt-8">
                                <Link href="/resume/resume-preview">
                                    <Button className="gap-2">
                    Proceed
                                        <ArrowRight size={16} />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
