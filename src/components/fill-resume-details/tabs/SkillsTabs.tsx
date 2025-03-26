import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useFormContext, Skill } from "@/context/FormContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Code, Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const TechnicalSkillsTab = () => {
    const { formData, addItem, removeItem, updateNestedField } = useFormContext();
    const [newSkill, setNewSkill] = useState<Partial<Skill>>({
        name: "",
        proficiency: "",
        years: "",
        category: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewSkill(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (field: string, value: string) => {
        setNewSkill(prev => ({ ...prev, [field]: value }));
    };

    const addSkill = () => {
        if (!newSkill.name || !newSkill.proficiency) {
            return; // Validation: at least skill name and proficiency are required
        }

        const skill: Skill = {
            id: uuidv4(),
            name: newSkill.name || "",
            proficiency: newSkill.proficiency || "",
            years: newSkill.years || "",
            category: newSkill.category || ""
        };

        addItem("skills", skill);
        setNewSkill({
            name: "",
            proficiency: "",
            years: "",
            category: ""
        });
    };

    const getSkillColor = (proficiency: string) => {
        switch(proficiency) {
        case "Beginner": return "bg-blue-100 text-blue-800";
        case "Intermediate": return "bg-purple-100 text-purple-800";
        case "Advanced": return "bg-green-100 text-green-800";
        case "Expert": return "bg-amber-100 text-amber-800";
        default: return "bg-gray-100 text-gray-800";
        }
    };

    const categoryOptions = [
        "Programming Languages",
        "Frontend",
        "Backend",
        "Database",
        "DevOps",
        "Design",
        "Tools",
        "Other"
    ];

    const proficiencyOptions = ["Beginner", "Intermediate", "Advanced", "Expert"];

    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h2 className="text-xl font-medium flex items-center gap-2 mb-4">
                    <Code className="text-primary" size={20} />
          Technical Skills
                </h2>
                <p className="text-muted-foreground mb-6">
          Add your technical skills, proficiency levels, and experience with each skill
                </p>
            </div>

            {/* Add new skill form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-muted/40 rounded-lg border border-border">
                <div className="space-y-2">
                    <Label htmlFor="name">Skill Name</Label>
                    <Input
                        id="name"
                        name="name"
                        placeholder="e.g., React, JavaScript, Python"
                        value={newSkill.name}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="proficiency">Proficiency Level</Label>
                    <Select
                        value={newSkill.proficiency}
                        onValueChange={(value) => handleSelectChange("proficiency", value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select proficiency" />
                        </SelectTrigger>
                        <SelectContent>
                            {proficiencyOptions.map(option => (
                                <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="years">Years of Experience</Label>
                    <Input
                        id="years"
                        name="years"
                        placeholder="e.g., 1, 2, 3+"
                        value={newSkill.years}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                        value={newSkill.category}
                        onValueChange={(value) => handleSelectChange("category", value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categoryOptions.map(option => (
                                <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="md:col-span-2 flex justify-end">
                    <Button
                        onClick={addSkill}
                        className="w-full md:w-auto"
                        disabled={!newSkill.name || !newSkill.proficiency}
                    >
                        <Plus size={16} className="mr-2" />
            Add Skill
                    </Button>
                </div>
            </div>

            {/* List of added skills */}
            <div className="space-y-4">
                <h3 className="font-medium text-lg">Added Skills</h3>
        
                {formData.skills && formData.skills.length > 0 ? (
                    <div className="space-y-3">
                        {formData.skills.map((skill) => (
                            <div 
                                key={skill.id}
                                className="flex items-center justify-between p-4 bg-card rounded-lg border border-border"
                            >
                                <div className="flex-1 mr-4">
                                    <div className="flex items-center gap-3">
                                        <span className="font-medium">{skill.name}</span>
                                        <Badge className={cn(getSkillColor(skill.proficiency))}>
                                            {skill.proficiency}
                                        </Badge>
                                        {skill.years && (
                                            <span className="text-sm text-muted-foreground">
                                                {skill.years} {parseInt(skill.years) === 1 ? "year" : "years"}
                                            </span>
                                        )}
                                    </div>
                  
                                    {skill.category && (
                                        <span className="text-sm text-muted-foreground">
                      Category: {skill.category}
                                        </span>
                                    )}
                                </div>
                
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeItem("skills", skill.id)}
                                    className="text-muted-foreground hover:text-destructive"
                                >
                                    <Trash2 size={18} />
                                </Button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-8 text-center text-muted-foreground border border-dashed border-muted rounded-lg">
                        <p>No skills added yet</p>
                        <p className="text-sm mt-1">Add your technical skills using the form above</p>
                    </div>
                )}
            </div>
        </div>
    );
};
