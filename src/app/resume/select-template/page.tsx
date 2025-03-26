"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import SearchFilter from "@/components/select-template/SearchFilter";
import TemplateCard from "@/components/select-template/TemplateCard";
import RecommendedSection from "@/components/select-template/RecommendedSection";
import { ArrowRight, CheckCircle2, List, Sparkles } from "lucide-react";
import Image from "next/image";
import template1 from "@/assets/images/resume-templates/template1.jpeg";
import { useRouter } from "next/navigation";

// Template model
export interface Template {
    id: string;
    name: string;
    image: string;
    category: string;
    isNew?: boolean;
    popularity: number;
    createdAt: Date;
  }
  
const SelectTemplate = () => {
    
    // Placeholder image from the project
    const templateImage = "/assets/icons/avatars/avatar1.jpg";
    
    // Mock templates data
    const templatesData: Template[] = [
        { 
            id: "1", 
            name: "Minimalist", 
            image: templateImage, 
            category: "simple", 
            popularity: 98, 
            createdAt: new Date("2023-01-15") 
        },
        { 
            id: "2", 
            name: "Modern Tech", 
            image: templateImage, 
            category: "modern", 
            isNew: true, 
            popularity: 87, 
            createdAt: new Date("2023-05-22") 
        },
        { 
            id: "3", 
            name: "Startup Fresh", 
            image: templateImage, 
            category: "creative", 
            isNew: true, 
            popularity: 76, 
            createdAt: new Date("2023-06-10") 
        },
        { 
            id: "4", 
            name: "Executive Pro", 
            image: templateImage, 
            category: "executive", 
            popularity: 92, 
            createdAt: new Date("2022-11-08") 
        },
        { 
            id: "5", 
            name: "Creative Studio", 
            image: templateImage, 
            category: "creative", 
            isNew: true, 
            popularity: 85, 
            createdAt: new Date("2023-04-30") 
        },
        { 
            id: "6", 
            name: "Academic Elite", 
            image: templateImage, 
            category: "academic", 
            popularity: 72, 
            createdAt: new Date("2022-09-12") 
        },
        { 
            id: "7", 
            name: "Elegant Serif", 
            image: templateImage, 
            category: "professional", 
            popularity: 89, 
            createdAt: new Date("2023-02-19") 
        },
        { 
            id: "8", 
            name: "Clean Data", 
            image: templateImage, 
            category: "simple", 
            popularity: 95, 
            createdAt: new Date("2022-10-05") 
        },
    ];
  
    const router = useRouter();
    // State for search and filters
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [sortBy, setSortBy] = useState("popular");
    const [selectedTemplate, setSelectedTemplate] = useState<string>("");
    const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  
    // Filter and sort templates based on user selections
    const filteredTemplates = templatesData
        .filter(template => {
            const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = categoryFilter === "all" || template.category === categoryFilter;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            switch (sortBy) {
            case "popular":
                return b.popularity - a.popularity;
            case "newest":
                return b.createdAt.getTime() - a.createdAt.getTime();
            case "alphabetical":
                return a.name.localeCompare(b.name);
            case "recommended":
            // Logic for recommended sorting could be more complex in a real app
                return b.popularity - a.popularity;
            default:
                return 0;
            }
        });
  
    // Handlers for template actions
    const handleTemplateSelect = (id: string) => {
        setSelectedTemplate(id);
    };
  
    const handleTemplatePreview = (id: string) => {
        const template = templatesData.find(t => t.id === id);
        if (template) {
            setPreviewTemplate(template);
        }
    };
  
    const handleProceed = () => {
        if (!selectedTemplate) {
            toast.error("No template selected", {
                description: "Please select a resume template to continue.",
            });
            return;
        }
        
        toast.success("Great choice!", {
            description: "You're now ready to customize your resume.",
        });

        console.log(selectedTemplate);
        // Navigate to the sections selection page with the selected template
        router.push(`/resume/select-sections/${selectedTemplate}`);
      
        // In a real app, you would navigate to the editing page
        console.log(`Proceeding with template ${selectedTemplate}`);
    };
  
    return (
        <div className="min-h-screen bg-background">
        
            <main className="max-w-7xl mx-auto px-4 pb-16">
                <div className="mt-12 mb-8 animate-fade-in">
                    <h1 className="text-4xl font-bold text-foreground mb-3">Choose a Resume Template</h1>
                    <p className="text-lg text-muted-foreground">
              Select a template that best fits your needs. You can preview or proceed directly.
                    </p>
                </div>
          
                <SearchFilter 
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    category={categoryFilter}
                    onCategoryChange={setCategoryFilter}
                    sortBy={sortBy}
                    onSortChange={setSortBy}    
                />

                {/* Only show recommended section if we're not filtering */}
                {!searchQuery && categoryFilter === "all" && (
                    <>
                        <RecommendedSection 
                            templates={templatesData.sort((a, b) => b.popularity - a.popularity).slice(0, 4)}
                            selectedTemplate={selectedTemplate}
                            onSelect={handleTemplateSelect}
                            onPreview={handleTemplatePreview}
                        />
                        <hr className="my-8 border-border  " />
                    </>
                )}
          
                <div className="mt-8">
                    <div className="flex items-center mb-6">
                        <List className="h-5 w-5 mr-2 text-primary" />
                        <h2 className="text-2xl font-medium text-foreground">All Templates</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredTemplates.map((template) => (
                            <TemplateCard
                                key={template.id}
                                id={template.id}
                                name={template.name}
                                image={template.image}
                                isNew={template.isNew}
                                category={template.category}
                                onSelect={handleTemplateSelect}
                                onPreview={handleTemplatePreview}
                                selected={selectedTemplate === template.id}
                            />
                        ))}
                    </div>
            
                    {filteredTemplates.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground text-lg">No templates found matching your criteria.</p>
                            <Button 
                                variant="outline" 
                                className="mt-4"
                                onClick={() => {
                                    setSearchQuery("");
                                    setCategoryFilter("all");
                                    setSortBy("popular");
                                }}
                            >
                  Reset Filters
                            </Button>
                        </div>
                    )}
                </div>
          
             
          
                {/* Fixed bottom CTA when a template is selected */}
                {selectedTemplate && (
                    <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-lg border-t border-border z-40 animate-slide-in-right">
                        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center">
                                <CheckCircle2 className="text-primary h-5 w-5 mr-2" />
                                <span className="font-medium">
                    Template selected: {templatesData.find(t => t.id === selectedTemplate)?.name}
                                </span>
                            </div>
                
                            <Button className="bg-primary hover:bg-primary/90 gap-2" onClick={handleProceed}>
                                <span>Customize Your Resume</span>
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}
          
                {/* Template Preview Dialog */}
                <Dialog open={!!previewTemplate} onOpenChange={(open) => !open && setPreviewTemplate(null)}>
                    <DialogContent className="max-w-3xl h-[80vh] overflow-auto p-0">
                        <DialogHeader className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg p-6 border-b border-border">
                            <DialogTitle className="text-2xl">
                                {previewTemplate?.name} Template
                            </DialogTitle>
                            <DialogDescription>
                  This is how your resume will look with the {previewTemplate?.name} template.
                            </DialogDescription>
                        </DialogHeader>
              
                        <div className="p-6">
                            <div className="aspect-[1/1.414] bg-white rounded-md overflow-hidden border border-border mb-6">
                                <Image 
                                    src={template1} 
                                    alt={previewTemplate?.name as string} 
                                    width={100}
                                    height={100}
                                    loading="lazy"
                                    className="w-full h-full object-cover"
                                    unoptimized={true}
                                />
                            </div>
                
                            <div className="flex justify-between">
                                <Button variant="outline" onClick={() => setPreviewTemplate(null)}>
                    Close Preview
                                </Button>
                  
                                <Button 
                                    className="bg-primary hover:bg-primary/90"
                                    onClick={() => {
                                        if (previewTemplate) {
                                            setSelectedTemplate(previewTemplate.id);
                                            setPreviewTemplate(null);
                                        }
                                    }}
                                >
                                    {selectedTemplate === previewTemplate?.id ? (
                                        <span className="flex items-center">
                                            <CheckCircle2 className="h-4 w-4 mr-2" />
                        Selected
                                        </span>
                                    ) : (
                                        "Select This Template"
                                    )}
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </main>
        </div>
    );
};
  

export default SelectTemplate;