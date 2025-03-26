import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useFormContext, WorkExperience } from "@/context/FormContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Briefcase, Plus, Trash2, CalendarDays, MapPin, CheckCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

export const WorkExperiencesTab = () => {
    const { formData, addItem, removeItem, updateNestedField } = useFormContext();
    const [newExperience, setNewExperience] = useState<Partial<WorkExperience>>({
        jobTitle: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        responsibilities: [],
        achievements: [],
        newResponsibility: "",
        newAchievement: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewExperience(prev => ({ ...prev, [name]: value }));
    };

    const addWorkExperience = () => {
        if (!newExperience.jobTitle || !newExperience.company || !newExperience.startDate) {
            return; // Basic validation
        }

        const experience: WorkExperience = {
            id: uuidv4(),
            jobTitle: newExperience.jobTitle || "",
            company: newExperience.company || "",
            location: newExperience.location || "",
            startDate: newExperience.startDate || "",
            endDate: newExperience.endDate || "",
            responsibilities: newExperience.responsibilities || [],
            achievements: newExperience.achievements || [],
            newResponsibility: "",
            newAchievement: ""
        };

        addItem("workExperiences", experience);
        setNewExperience({
            jobTitle: "",
            company: "",
            location: "",
            startDate: "",
            endDate: "",
            responsibilities: [],
            achievements: [],
            newResponsibility: "",
            newAchievement: ""
        });
    };

    const addResponsibility = () => {
        if (newExperience.newResponsibility) {
            setNewExperience(prev => ({
                ...prev,
                responsibilities: [...(prev.responsibilities || []), prev.newResponsibility || ""],
                newResponsibility: ""
            }));
        }
    };

    const addAchievement = () => {
        if (newExperience.newAchievement) {
            setNewExperience(prev => ({
                ...prev,
                achievements: [...(prev.achievements || []), prev.newAchievement || ""],
                newAchievement: ""
            }));
        }
    };

    const removeResponsibility = (index: number) => {
        setNewExperience(prev => ({
            ...prev,
            responsibilities: prev.responsibilities?.filter((_, i) => i !== index) || []
        }));
    };

    const removeAchievement = (index: number) => {
        setNewExperience(prev => ({
            ...prev,
            achievements: prev.achievements?.filter((_, i) => i !== index) || []
        }));
    };

    // For editing existing experience
    const addExperienceResponsibility = (id: string) => {
        const experience = formData.workExperiences.find(exp => exp.id === id);
        if (experience && experience.newResponsibility) {
            const updatedResponsibilities = [...experience.responsibilities, experience.newResponsibility];
            updateNestedField("workExperiences", id, "responsibilities", updatedResponsibilities);
            updateNestedField("workExperiences", id, "newResponsibility", "");
        }
    };

    const addExperienceAchievement = (id: string) => {
        const experience = formData.workExperiences.find(exp => exp.id === id);
        if (experience && experience.newAchievement) {
            const updatedAchievements = [...experience.achievements, experience.newAchievement];
            updateNestedField("workExperiences", id, "achievements", updatedAchievements);
            updateNestedField("workExperiences", id, "newAchievement", "");
        }
    };

    const removeExperienceResponsibility = (id: string, index: number) => {
        const experience = formData.workExperiences.find(exp => exp.id === id);
        if (experience) {
            const updatedResponsibilities = experience.responsibilities.filter((_, i) => i !== index);
            updateNestedField("workExperiences", id, "responsibilities", updatedResponsibilities);
        }
    };

    const removeExperienceAchievement = (id: string, index: number) => {
        const experience = formData.workExperiences.find(exp => exp.id === id);
        if (experience) {
            const updatedAchievements = experience.achievements.filter((_, i) => i !== index);
            updateNestedField("workExperiences", id, "achievements", updatedAchievements);
        }
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h2 className="text-xl font-medium flex items-center gap-2 mb-4">
                    <Briefcase className="text-primary" size={20} />
          Work Experiences
                </h2>
                <p className="text-muted-foreground mb-6">
          Add your professional work experiences in reverse chronological order (most recent first)
                </p>
            </div>

            {/* Add new work experience form */}
            <div className="space-y-6 p-6 bg-muted/40 rounded-lg border border-border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="jobTitle">Job Title</Label>
                        <Input
                            id="jobTitle"
                            name="jobTitle"
                            placeholder="e.g., Software Engineer, Marketing Specialist"
                            value={newExperience.jobTitle}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="company">Company Name</Label>
                        <Input
                            id="company"
                            name="company"
                            placeholder="e.g., Google, Microsoft"
                            value={newExperience.company}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="location" className="flex items-center gap-1">
                            <MapPin size={14} />
              Location (Optional)
                        </Label>
                        <Input
                            id="location"
                            name="location"
                            placeholder="e.g., San Francisco, CA or Remote"
                            value={newExperience.location}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="space-y-2 md:col-span-1">
                        <Label className="flex items-center gap-1">
                            <CalendarDays size={14} />
              Employment Dates
                        </Label>
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                type="date"
                                name="startDate"
                                placeholder="Start Date"
                                value={newExperience.startDate}
                                onChange={handleInputChange}
                            />
                            <Input
                                type="date"
                                name="endDate"
                                placeholder="End Date (leave blank if current)"
                                value={newExperience.endDate}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Responsibilities */}
                <Separator />
                <div className="space-y-4">
                    <h3 className="font-medium">Key Responsibilities</h3>
          
                    <div className="flex items-center gap-2">
                        <Input
                            name="newResponsibility"
                            placeholder="Add a responsibility"
                            value={newExperience.newResponsibility}
                            onChange={handleInputChange}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && newExperience.newResponsibility) {
                                    e.preventDefault();
                                    addResponsibility();
                                }
                            }}
                        />
                        <Button 
                            type="button" 
                            variant="outline" 
                            onClick={addResponsibility}
                            disabled={!newExperience.newResponsibility}
                        >
                            <Plus size={16} />
                        </Button>
                    </div>

                    {/* List of added responsibilities */}
                    {newExperience.responsibilities && newExperience.responsibilities.length > 0 && (
                        <div className="space-y-2 mt-2">
                            {newExperience.responsibilities.map((responsibility, index) => (
                                <div key={index} className="flex items-center justify-between p-2 pl-3 bg-background rounded border">
                                    <span className="text-sm">{responsibility}</span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeResponsibility(index)}
                                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                    >
                                        <Trash2 size={14} />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Achievements */}
                <Separator />
                <div className="space-y-4">
                    <h3 className="font-medium">Key Achievements</h3>
          
                    <div className="flex items-center gap-2">
                        <Input
                            name="newAchievement"
                            placeholder="Add an achievement"
                            value={newExperience.newAchievement}
                            onChange={handleInputChange}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && newExperience.newAchievement) {
                                    e.preventDefault();
                                    addAchievement();
                                }
                            }}
                        />
                        <Button 
                            type="button" 
                            variant="outline"
                            onClick={addAchievement}
                            disabled={!newExperience.newAchievement}
                        >
                            <Plus size={16} />
                        </Button>
                    </div>

                    {/* List of added achievements */}
                    {newExperience.achievements && newExperience.achievements.length > 0 && (
                        <div className="space-y-2 mt-2">
                            {newExperience.achievements.map((achievement, index) => (
                                <div key={index} className="flex items-center justify-between p-2 pl-3 bg-background rounded border">
                                    <span className="text-sm">{achievement}</span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeAchievement(index)}
                                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                    >
                                        <Trash2 size={14} />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex justify-end mt-6">
                    <Button
                        onClick={addWorkExperience}
                        disabled={!newExperience.jobTitle || !newExperience.company || !newExperience.startDate}
                    >
                        <Plus size={16} className="mr-2" />
            Add Experience
                    </Button>
                </div>
            </div>

            {/* List of added work experiences */}
            <div className="space-y-4">
                <h3 className="font-medium text-lg">Work Experience History</h3>
        
                {formData.workExperiences && formData.workExperiences.length > 0 ? (
                    <div className="space-y-4">
                        {formData.workExperiences.map((experience) => (
                            <div 
                                key={experience.id}
                                className="p-6 bg-card rounded-lg border border-border space-y-5"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    <div>
                                        <h4 className="font-medium text-base">{experience.jobTitle}</h4>
                                        <div className="flex flex-wrap gap-2 items-center mt-1">
                                            <span className="text-muted-foreground">{experience.company}</span>
                                            {experience.location && (
                                                <>
                                                    <span className="text-muted-foreground">•</span>
                                                    <span className="text-muted-foreground flex items-center gap-1">
                                                        <MapPin size={12} /> {experience.location}
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                  
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline" className="flex items-center gap-1">
                                            <CalendarDays size={12} />
                                            {new Date(experience.startDate).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short"
                                            })}
                                            {experience.endDate ? ` - ${new Date(experience.endDate).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short"
                                            })}` : " - Present"}
                                        </Badge>
                    
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeItem("workExperiences", experience.id)}
                                            className="text-muted-foreground hover:text-destructive"
                                        >
                                            <Trash2 size={18} />
                                        </Button>
                                    </div>
                                </div>

                                <Separator />

                                {/* Edit responsibilities */}
                                <div className="space-y-3">
                                    <h5 className="font-medium text-sm">Responsibilities</h5>
                  
                                    <div className="flex items-center gap-2">
                                        <Input
                                            name="newResponsibility"
                                            placeholder="Add a responsibility"
                                            value={experience.newResponsibility || ""}
                                            onChange={(e) => updateNestedField("workExperiences", experience.id, "newResponsibility", e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter" && experience.newResponsibility) {
                                                    e.preventDefault();
                                                    addExperienceResponsibility(experience.id);
                                                }
                                            }}
                                        />
                                        <Button 
                                            type="button" 
                                            variant="outline"
                                            onClick={() => addExperienceResponsibility(experience.id)}
                                            disabled={!experience.newResponsibility}
                                        >
                                            <Plus size={16} />
                                        </Button>
                                    </div>
                  
                                    {experience.responsibilities.length > 0 ? (
                                        <div className="space-y-2">
                                            {experience.responsibilities.map((responsibility, index) => (
                                                <div key={index} className="flex items-start gap-2 group">
                                                    <div className="flex-shrink-0 mt-1 text-muted-foreground">
                                                        <CheckCircle size={14} />
                                                    </div>
                                                    <div className="flex-1 text-sm">{responsibility}</div>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => removeExperienceResponsibility(experience.id, index)}
                                                        className="h-6 w-6 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <Trash2 size={12} />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-muted-foreground">No responsibilities added yet</p>
                                    )}
                                </div>

                                <Separator />

                                {/* Edit achievements */}
                                <div className="space-y-3">
                                    <h5 className="font-medium text-sm">Achievements</h5>
                  
                                    <div className="flex items-center gap-2">
                                        <Input
                                            name="newAchievement"
                                            placeholder="Add an achievement"
                                            value={experience.newAchievement || ""}
                                            onChange={(e) => updateNestedField("workExperiences", experience.id, "newAchievement", e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter" && experience.newAchievement) {
                                                    e.preventDefault();
                                                    addExperienceAchievement(experience.id);
                                                }
                                            }}
                                        />
                                        <Button 
                                            type="button" 
                                            variant="outline"
                                            onClick={() => addExperienceAchievement(experience.id)}
                                            disabled={!experience.newAchievement}
                                        >
                                            <Plus size={16} />
                                        </Button>
                                    </div>
                  
                                    {experience.achievements.length > 0 ? (
                                        <div className="space-y-2">
                                            {experience.achievements.map((achievement, index) => (
                                                <div key={index} className="flex items-start gap-2 group">
                                                    <div className="flex-shrink-0 mt-1 text-emerald-500">
                                                        <CheckCircle size={14} />
                                                    </div>
                                                    <div className="flex-1 text-sm">{achievement}</div>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => removeExperienceAchievement(experience.id, index)}
                                                        className="h-6 w-6 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <Trash2 size={12} />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-muted-foreground">No achievements added yet</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-8 text-center text-muted-foreground border border-dashed border-muted rounded-lg">
                        <p>No work experiences added yet</p>
                        <p className="text-sm mt-1">Add your professional experiences using the form above</p>
                    </div>
                )}
            </div>
        </div>
    );
};
