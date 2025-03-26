"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Pen, Bot, CloudDownload } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ResumeCreationMethod = () => {
    const router = useRouter();

    const handleMethodSelect = (method: string) => {
    // Store the selected method in localStorage for future reference
        localStorage.setItem("resumeCreationMethod", method);

        if(method === "manual") {
            // Navigate to the template selection page
            router.push("/resume/select-sections");
        } else if(method === "ai") {
            // Navigate to the template selection page
            // router.push("/resume/fill-details");
            toast.error("This feature is not available yet");
        } else if(method === "scraping") {
            // Navigate to the template selection page
            // router.push("/resume/fill-details");
            toast.error("This feature is not available yet");
        }
    };

    return (
        <div className="min-h-screen bg-background">
      
            <main className="max-w-7xl mx-auto px-4 pb-16 pt-8">
                <div className="mt-8 mb-12 text-center animate-fade-in">
                    <h1 className="text-4xl font-bold text-foreground mb-3">How would you like to create your resume?</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose your preferred method to create your resume. You&apos;ll select a template in the next step.
                    </p>
                </div>
        
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {/* Manual Creation Option */}
                    <Card className="hover-card-animation border border-border">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-2xl">
                                <Pen className="h-6 w-6 text-primary" />
                Manual Creation
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-base min-h-[80px]">
                Create your resume from scratch. Enter your information manually and have full control over the content.
                            </CardDescription>
                        </CardContent>
                        <CardFooter>
                            <Button 
                                className="w-full" 
                                onClick={() => handleMethodSelect("manual")}
                            >
                Select <Pen className="ml-2 h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>
          
                    {/* AI-Assisted Creation Option */}
                    <Card className="hover-card-animation border border-border">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-2xl">
                                <Bot className="h-6 w-6 text-primary" />
                AI-Assisted
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-base min-h-[80px]">
                Let AI generate your resume content based on a few key details about your experience and skills.
                            </CardDescription>
                        </CardContent>
                        <CardFooter>
                            <Button 
                                className="w-full" 
                                onClick={() => handleMethodSelect("ai")}
                            >
                Select <Bot className="ml-2 h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>
          
                    {/* Web Scraping Option */}
                    <Card className="hover-card-animation border border-border">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-2xl">
                                <CloudDownload className="h-6 w-6 text-primary" />
                Web Scraping
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-base min-h-[80px]">
                Import your data from LinkedIn or other professional profile. We&apos;ll create your resume automatically.
                            </CardDescription>
                        </CardContent>
                        <CardFooter>
                            <Button 
                                className="w-full" 
                                onClick={() => handleMethodSelect("scraping")}
                            >
                Select <CloudDownload className="ml-2 h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default ResumeCreationMethod;