import React, { useState } from "react";
import { useFormContext, Education } from "@/context/FormContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
    Plus, Trash2, GraduationCap, Calendar, 
    BookOpen, Building, Award
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const EducationTab = () => {
    const { formData, addItem, removeItem, updateNestedField } = useFormContext();
    const { education } = formData;
    const [showAddForm, setShowAddForm] = useState(false);
    const [newEducation, setNewEducation] = useState<Omit<Education, "id">>({
        institution: "",
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
        gpa: "",
        description: "",
    });

    const handleAddEducation = () => {
        const educationWithId = {
            ...newEducation,
            id: crypto.randomUUID(),
        };
    
        addItem("education", educationWithId);
        setNewEducation({
            institution: "",
            degree: "",
            field: "",
            startDate: "",
            endDate: "",
            gpa: "",
            description: "",
        });
        setShowAddForm(false);
    };

    // Handle changes for existing education entries
    const handleEducationChange = (id: string, field: string, value: any) => {
        updateNestedField("education", id, field, value);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h2 className="text-xl font-medium mb-4">Education</h2>
                <p className="text-muted-foreground mb-6">
          Add details about your educational background
                </p>
            </div>

            {/* Education List */}
            {education.length > 0 && (
                <div className="space-y-4 mb-8">
                    {education.map((edu) => (
                        <Card key={edu.id} className="overflow-hidden group">
                            <CardHeader className="bg-secondary/50 py-4">
                                <div className="flex items-start justify-between">
                                    <CardTitle className="text-lg font-medium">
                                        {edu.institution || "Untitled Institution"} 
                                        {edu.degree && <span className="text-muted-foreground ml-2 text-sm font-normal">• {edu.degree}</span>}
                                    </CardTitle>
                                    <Button 
                                        variant="ghost" 
                                        size="icon"
                                        className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => removeItem("education", edu.id)}
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-4 pb-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Institution Information */}
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor={`institution-${edu.id}`} className="flex items-center gap-2">
                                                <Building size={14} />
                        Institution
                                            </Label>
                                            <Input
                                                id={`institution-${edu.id}`}
                                                value={edu.institution}
                                                onChange={(e) => handleEducationChange(edu.id, "institution", e.target.value)}
                                                className="input-focus"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor={`degree-${edu.id}`} className="flex items-center gap-2">
                                                <GraduationCap size={14} />
                        Degree
                                            </Label>
                                            <Input
                                                id={`degree-${edu.id}`}
                                                value={edu.degree}
                                                onChange={(e) => handleEducationChange(edu.id, "degree", e.target.value)}
                                                placeholder="Bachelor of Science, Master's, PhD, etc."
                                                className="input-focus"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor={`field-${edu.id}`} className="flex items-center gap-2">
                                                <BookOpen size={14} />
                        Field of Study
                                            </Label>
                                            <Input
                                                id={`field-${edu.id}`}
                                                value={edu.field}
                                                onChange={(e) => handleEducationChange(edu.id, "field", e.target.value)}
                                                placeholder="Computer Science, Business, etc."
                                                className="input-focus"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor={`startDate-${edu.id}`} className="flex items-center gap-2">
                                                    <Calendar size={14} />
                          Start Date
                                                </Label>
                                                <Input
                                                    id={`startDate-${edu.id}`}
                                                    type="date"
                                                    value={edu.startDate}
                                                    onChange={(e) => handleEducationChange(edu.id, "startDate", e.target.value)}
                                                    className="input-focus"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor={`endDate-${edu.id}`} className="flex items-center gap-2">
                                                    <Calendar size={14} />
                          End Date
                                                </Label>
                                                <Input
                                                    id={`endDate-${edu.id}`}
                                                    type="date"
                                                    value={edu.endDate}
                                                    onChange={(e) => handleEducationChange(edu.id, "endDate", e.target.value)}
                                                    className="input-focus"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor={`gpa-${edu.id}`} className="flex items-center gap-2">
                                                <Award size={14} />
                        GPA (Optional)
                                            </Label>
                                            <Input
                                                id={`gpa-${edu.id}`}
                                                value={edu.gpa}
                                                onChange={(e) => handleEducationChange(edu.id, "gpa", e.target.value)}
                                                placeholder="3.8/4.0"
                                                className="input-focus"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor={`description-${edu.id}`}>
                        Description or Highlights (Optional)
                                            </Label>
                                            <Textarea
                                                id={`description-${edu.id}`}
                                                value={edu.description}
                                                onChange={(e) => handleEducationChange(edu.id, "description", e.target.value)}
                                                placeholder="Notable achievements, courses, or activities..."
                                                className="min-h-[80px] input-focus resize-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Add New Education Form */}
            {showAddForm ? (
                <Card className="border-dashed border-primary/40 bg-secondary/30 overflow-hidden">
                    <CardHeader className="bg-secondary/50 py-4">
                        <CardTitle className="text-lg font-medium">Add New Education</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 pb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Institution Information */}
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="new-institution" className="flex items-center gap-2">
                                        <Building size={14} />
                    Institution
                                    </Label>
                                    <Input
                                        id="new-institution"
                                        value={newEducation.institution}
                                        onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                                        placeholder="University or School Name"
                                        className="input-focus"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="new-degree" className="flex items-center gap-2">
                                        <GraduationCap size={14} />
                    Degree
                                    </Label>
                                    <Input
                                        id="new-degree"
                                        value={newEducation.degree}
                                        onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                                        placeholder="Bachelor of Science, Master's, PhD, etc."
                                        className="input-focus"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="new-field" className="flex items-center gap-2">
                                        <BookOpen size={14} />
                    Field of Study
                                    </Label>
                                    <Input
                                        id="new-field"
                                        value={newEducation.field}
                                        onChange={(e) => setNewEducation({ ...newEducation, field: e.target.value })}
                                        placeholder="Computer Science, Business, etc."
                                        className="input-focus"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="new-startDate" className="flex items-center gap-2">
                                            <Calendar size={14} />
                      Start Date
                                        </Label>
                                        <Input
                                            id="new-startDate"
                                            type="date"
                                            value={newEducation.startDate}
                                            onChange={(e) => setNewEducation({ ...newEducation, startDate: e.target.value })}
                                            className="input-focus"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="new-endDate" className="flex items-center gap-2">
                                            <Calendar size={14} />
                      End Date
                                        </Label>
                                        <Input
                                            id="new-endDate"
                                            type="date"
                                            value={newEducation.endDate}
                                            onChange={(e) => setNewEducation({ ...newEducation, endDate: e.target.value })}
                                            className="input-focus"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="new-gpa" className="flex items-center gap-2">
                                        <Award size={14} />
                    GPA (Optional)
                                    </Label>
                                    <Input
                                        id="new-gpa"
                                        value={newEducation.gpa}
                                        onChange={(e) => setNewEducation({ ...newEducation, gpa: e.target.value })}
                                        placeholder="3.8/4.0"
                                        className="input-focus"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="new-description">
                    Description or Highlights (Optional)
                                    </Label>
                                    <Textarea
                                        id="new-description"
                                        value={newEducation.description}
                                        onChange={(e) => setNewEducation({ ...newEducation, description: e.target.value })}
                                        placeholder="Notable achievements, courses, or activities..."
                                        className="min-h-[80px] input-focus resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex justify-end gap-2 mt-6">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setShowAddForm(false)}
                            >
                Cancel
                            </Button>
                            <Button
                                type="button"
                                onClick={handleAddEducation}
                                disabled={!newEducation.institution.trim() || !newEducation.degree.trim()}
                            >
                Add Education
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <Button
                    type="button"
                    variant="outline"
                    className="w-full py-8 border-dashed hover:border-primary/60 transition-colors"
                    onClick={() => setShowAddForm(true)}
                >
                    <Plus size={16} className="mr-2" />
          Add New Education
                </Button>
            )}
        </div>
    );
};
