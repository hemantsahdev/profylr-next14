import React, { useState } from "react";
import { useFormContext, Achievement } from "@/context/FormContext";
import { v4 as uuidv4 } from "uuid";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Plus, Trash2, Trophy } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const AchievementsTab = () => {
    const { formData, addItem, removeItem, updateNestedField } = useFormContext();
  
    const [newAchievement, setNewAchievement] = useState<Partial<Achievement>>({
        id: uuidv4(),
        title: "",
        date: "",
        description: "",
        issuer: "",
        category: "",
        recognitionLevel: ""
    });

    const handleChange = (field: string, value: string) => {
        setNewAchievement({
            ...newAchievement,
            [field]: value
        });
    };

    const handleDateChange = (date: Date | undefined) => {
        if (!date) return;
        setNewAchievement({
            ...newAchievement,
            date: format(date, "yyyy-MM-dd")
        });
    };

    const addAchievement = () => {
        if (!newAchievement.title || !newAchievement.date) {
            return; // Require at minimum the title and date
        }

        addItem("achievements", newAchievement as Achievement);
    
        // Reset form
        setNewAchievement({
            id: uuidv4(),
            title: "",
            date: "",
            description: "",
            issuer: "",
            category: "",
            recognitionLevel: ""
        });
    };

    // Categories for achievements
    const achievementCategories = [
        "Academic",
        "Professional",
        "Industry Recognition",
        "Leadership",
        "Community Service",
        "Competitive",
        "Technical",
        "Research",
        "Creative",
        "Athletics",
        "Other"
    ];

    // Recognition levels
    const recognitionLevels = [
        "International",
        "National",
        "Regional",
        "State/Provincial",
        "Local",
        "Organizational",
        "Departmental"
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Achievements & Awards</h2>
            <p className="text-muted-foreground">
        Showcase your notable achievements, awards, and recognition to highlight your accomplishments.
            </p>
      
            {/* Add new achievement form */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Trophy className="h-5 w-5" />
                        <span>Add New Achievement or Award</span>
                    </CardTitle>
                    <CardDescription>
            Enter your achievement details. Fields marked with * are required.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="achievement-title">Achievement Title *</Label>
                            <Input
                                id="achievement-title"
                                placeholder="e.g. Employee of the Year, Dean's List, Research Award"
                                value={newAchievement.title}
                                onChange={(e) => handleChange("title", e.target.value)}
                            />
                        </div>
            
                        <div className="space-y-2">
                            <Label htmlFor="achievement-date">Date Received *</Label>
                            <Popover>
                                <PopoverTrigger asChild={true}>
                                    <Button
                                        variant="outline"
                                        id="achievement-date"
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !newAchievement.date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {newAchievement.date ? 
                                            format(new Date(newAchievement.date), "PPP") : 
                                            "Select date received"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={newAchievement.date ? new Date(newAchievement.date) : undefined}
                                        onSelect={handleDateChange}
                                        initialFocus={true}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
            
                        <div className="space-y-2">
                            <Label htmlFor="achievement-issuer">Issuing Organization</Label>
                            <Input
                                id="achievement-issuer"
                                placeholder="e.g. Google, University of Michigan, IEEE"
                                value={newAchievement.issuer}
                                onChange={(e) => handleChange("issuer", e.target.value)}
                            />
                        </div>
            
                        <div className="space-y-2">
                            <Label htmlFor="achievement-category">Category</Label>
                            <Select 
                                value={newAchievement.category}
                                onValueChange={(value) => handleChange("category", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select achievement category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {achievementCategories.map(category => (
                                            <SelectItem key={category} value={category}>
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
            
                        <div className="space-y-2">
                            <Label htmlFor="recognition-level">Recognition Level</Label>
                            <Select 
                                value={newAchievement.recognitionLevel}
                                onValueChange={(value) => handleChange("recognitionLevel", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select level of recognition" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {recognitionLevels.map(level => (
                                            <SelectItem key={level} value={level}>
                                                {level}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
            
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="achievement-description">Description</Label>
                            <Textarea
                                id="achievement-description"
                                placeholder="Briefly describe this achievement and why it's significant"
                                className="min-h-24 resize-y"
                                value={newAchievement.description}
                                onChange={(e) => handleChange("description", e.target.value)}
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        className="w-full"
                        onClick={addAchievement}
                        disabled={!newAchievement.title || !newAchievement.date}
                    >
                        <Plus className="mr-2 h-4 w-4" />
            Add Achievement
                    </Button>
                </CardFooter>
            </Card>
      
            {/* Display existing achievements */}
            {formData.achievements && formData.achievements.length > 0 ? (
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Your Achievements</h3>
                    <div className="grid grid-cols-1 gap-4">
                        {formData.achievements.map((achievement) => (
                            <Card key={achievement.id} className="group">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-lg">{achievement.title}</CardTitle>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={() => removeItem("achievements", achievement.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <CardDescription>
                                        {achievement.issuer && `${achievement.issuer}`}
                                        {achievement.recognitionLevel && ` • ${achievement.recognitionLevel} level`}
                                        {achievement.category && ` • ${achievement.category}`}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pb-4 text-sm">
                                    <div className="mb-2 font-medium">
                                        {achievement.date && `Received: ${format(new Date(achievement.date), "MMMM yyyy")}`}
                                    </div>
                  
                                    {achievement.description && (
                                        <p className="text-muted-foreground">{achievement.description}</p>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center py-10 text-muted-foreground">
                    <Trophy className="mx-auto h-10 w-10 mb-3 opacity-50" />
                    <p>No achievements added yet. Add your first achievement above.</p>
                </div>
            )}
        </div>
    );
};
