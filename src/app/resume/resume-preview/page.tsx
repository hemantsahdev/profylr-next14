
"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useFormContext } from "@/context/FormContext";
import { Download, Edit, Share, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import Link from "next/link";

const ResumePreview = () => {
    const { formData } = useFormContext();
  
    const handleDownload = () => {
        toast.success("Download functionality will be implemented later");
    };
  
    const handleShare = () => {
        toast.success("Share functionality will be implemented later");
    };
  
    const handleTemplateChange = () => {
        toast.success("Template change functionality will be implemented later");
    };

    return (
        <div className="min-h-screen bg-dot-pattern">
            <header className="sticky top-0 z-10 backdrop-blur-md bg-background/80 border-b border-border">
                <div className="container mx-auto py-4 px-4 sm:px-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-medium tracking-tight">Resume Preview</h1>
                        <p className="text-muted-foreground text-sm">
              Review your resume before downloading
                        </p>
                    </div>
          
                    <Link href="/">
                        <Button variant="outline" className="gap-2">
                            <Edit size={16} />
              Back to Editor
                        </Button>
                    </Link>
                </div>
            </header>

            <main className="container mx-auto px-4 sm:px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {/* Resume Preview */}
                    <div className="lg:col-span-2">
                        <Card className="p-8 shadow-lg min-h-[800px] border-[#ffdada] border-2">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-gray-800">
                                    {formData.personalInfo.fullName || "Your Name"}
                                </h2>
                
                                {formData.personalInfo.email && (
                                    <div className="text-sm text-gray-600 mt-2">
                                        {formData.personalInfo.email} • {formData.personalInfo.phone} • {formData.personalInfo.location}
                                    </div>
                                )}
                
                                {(formData.personalInfo.github || formData.personalInfo.linkedin) && (
                                    <div className="text-sm text-gray-600 mt-1">
                                        {formData.personalInfo.github && `GitHub: ${formData.personalInfo.github}`}
                                        {formData.personalInfo.github && formData.personalInfo.linkedin && " • "}
                                        {formData.personalInfo.linkedin && `LinkedIn: ${formData.personalInfo.linkedin}`}
                                    </div>
                                )}
                            </div>
              
                            {/* This is a placeholder for the actual resume content */}
                            <div className="text-center text-muted-foreground py-40">
                                <FileText className="h-16 w-16 mx-auto mb-4 opacity-30" />
                                <p className="text-lg">This is where your beautifully crafted resume will be displayed.</p>
                                <p className="text-sm mt-2">Future implementation will render a complete formatted resume here.</p>
                            </div>
                        </Card>
                    </div>
          
                    {/* Action Sidebar */}
                    <div className="lg:col-span-1">
                        <Card className="p-6 shadow-md">
                            <h3 className="text-xl font-medium mb-6">Your resume is ready!</h3>
                            <p className="text-muted-foreground mb-8">
                Make sure to review it before downloading.
                            </p>
              
                            <div className="space-y-4">
                                <Button className="w-full gap-2" onClick={handleDownload}>
                                    <Download size={16} />
                  Download PDF
                                </Button>
                
                                <Button variant="outline" className="w-full gap-2" onClick={handleShare}>
                                    <Share size={16} />
                  Share Resume
                                </Button>
                
                                <Button variant="secondary" className="w-full gap-2" onClick={handleTemplateChange}>
                                    <FileText size={16} />
                  Change Template
                                </Button>
                
                                <Link href="/resume/fill-details" className="block w-full">
                                    <Button variant="ghost" className="w-full gap-2">
                                        <Edit size={16} />
                    Continue Editing
                                    </Button>
                                </Link>
                            </div>
              
                            <div className="mt-8 pt-6 border-t">
                                <h4 className="font-medium mb-3">Export Format</h4>
                                <select 
                                    className="w-full p-2 rounded-md border border-input bg-background"
                                    title="Export Format"
                                >
                                    <option value="pdf">PDF</option>
                                    <option value="docx">DOCX</option>
                                    <option value="txt">Plain Text</option>
                                </select>
                            </div>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ResumePreview;
