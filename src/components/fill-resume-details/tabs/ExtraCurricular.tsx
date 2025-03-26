import React, { useState } from "react";
import { useFormContext } from "@/context/FormContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Activity,
    Calendar,
    Edit,
    Trash2,
    Plus,
    User,
    Bookmark,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";

export interface ExtraCurricular {
  id: string;
  activity: string;
  organization: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export const ExtraCurricularTab = () => {
    const { formData, addItem, removeItem, updateNestedField } = useFormContext();
    const extraCurricular = formData.extraCurricular || [];

    const [newActivity, setNewActivity] = useState<ExtraCurricular>({
        id: "",
        activity: "",
        organization: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
    });

    const [isAdding, setIsAdding] = useState(false);

    const resetForm = () => {
        setNewActivity({
            id: "",
            activity: "",
            organization: "",
            role: "",
            startDate: "",
            endDate: "",
            description: "",
        });
    };

    const handleAddClick = () => {
        setIsAdding(true);
    };

    const handleCancelAdd = () => {
        setIsAdding(false);
        resetForm();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewActivity((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newActivity.activity && newActivity.organization) {
            const activityToAdd = {
                ...newActivity,
                id: uuidv4(),
            };
            addItem("extraCurricular", activityToAdd);
            setIsAdding(false);
            resetForm();
        }
    };

    const handleActivityUpdate = (id: string, field: string, value: string) => {
        updateNestedField("extraCurricular", id, field, value);
    };

    const handleDeleteActivity = (id: string) => {
        removeItem("extraCurricular", id);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h2 className="text-xl font-medium mb-4">Extra-Curricular Activities</h2>
                <p className="text-muted-foreground mb-6">
          Add activities that showcase your leadership, teamwork, and personal development
                </p>
            </div>

            {/* List of existing activities */}
            {extraCurricular.length > 0 && (
                <div className="space-y-4">
                    {extraCurricular.map((activity: ExtraCurricular) => (
                        <Card key={activity.id} className="border border-border">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-lg font-semibold">
                                        {activity.activity}
                                    </CardTitle>
                                    <div className="flex space-x-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDeleteActivity(activity.id)}
                                            className="h-8 w-8 text-destructive"
                                        >
                                            <Trash2 size={16} />
                                        </Button>
                                    </div>
                                </div>
                                <CardDescription className="flex flex-col md:flex-row md:items-center gap-2 text-sm">
                                    <span className="flex items-center gap-1">
                                        <Bookmark size={14} />
                                        {activity.organization}
                                    </span>
                                    {activity.role && (
                                        <span className="flex items-center gap-1">
                                            <User size={14} />
                                            {activity.role}
                                        </span>
                                    )}
                                    {(activity.startDate || activity.endDate) && (
                                        <span className="flex items-center gap-1">
                                            <Calendar size={14} />
                                            {activity.startDate && activity.endDate
                                                ? `${activity.startDate} - ${activity.endDate}`
                                                : activity.startDate
                                                    ? `From ${activity.startDate}`
                                                    : `Until ${activity.endDate}`}
                                        </span>
                                    )}
                                </CardDescription>
                            </CardHeader>
                            {activity.description && (
                                <CardContent className="pt-2">
                                    <p className="text-sm">{activity.description}</p>
                                </CardContent>
                            )}
                            <CardFooter className="flex flex-wrap gap-2 pt-2">
                                {/* Editable fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                    <div className="space-y-2">
                                        <Label htmlFor={`activity-${activity.id}`}>Activity Name</Label>
                                        <Input
                                            id={`activity-${activity.id}`}
                                            value={activity.activity}
                                            onChange={(e) => handleActivityUpdate(activity.id, "activity", e.target.value)}
                                            className="w-full"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor={`organization-${activity.id}`}>Organization</Label>
                                        <Input
                                            id={`organization-${activity.id}`}
                                            value={activity.organization}
                                            onChange={(e) => 
                                                handleActivityUpdate(activity.id, "organization", e.target.value)
                                            }
                                            className="w-full"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor={`role-${activity.id}`}>Role/Position</Label>
                                        <Input
                                            id={`role-${activity.id}`}
                                            value={activity.role}
                                            onChange={(e) => handleActivityUpdate(activity.id, "role", e.target.value)}
                                            className="w-full"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor={`startDate-${activity.id}`}>Start Date</Label>
                                        <Input
                                            id={`startDate-${activity.id}`}
                                            value={activity.startDate}
                                            onChange={(e) => 
                                                handleActivityUpdate(activity.id, "startDate", e.target.value)
                                            }
                                            placeholder="e.g., Jan 2020"
                                            className="w-full"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor={`endDate-${activity.id}`}>End Date</Label>
                                        <Input
                                            id={`endDate-${activity.id}`}
                                            value={activity.endDate}
                                            onChange={(e) => 
                                                handleActivityUpdate(activity.id, "endDate", e.target.value)
                                            }
                                            placeholder="e.g., Present"
                                            className="w-full"
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor={`description-${activity.id}`}>Description</Label>
                                        <Textarea
                                            id={`description-${activity.id}`}
                                            value={activity.description}
                                            onChange={(e) => 
                                                handleActivityUpdate(activity.id, "description", e.target.value)
                                            }
                                            className="w-full"
                                        />
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}

            {/* Form to add new activity */}
            {isAdding ? (
                <Card className="border border-border mt-6">
                    <CardHeader>
                        <CardTitle className="text-lg">Add New Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="activity">Activity Name*</Label>
                                    <Input
                                        id="activity"
                                        name="activity"
                                        value={newActivity.activity}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Student Government"
                                        required={true}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="organization">Organization*</Label>
                                    <Input
                                        id="organization"
                                        name="organization"
                                        value={newActivity.organization}
                                        onChange={handleInputChange}
                                        placeholder="e.g., University of Example"
                                        required={true}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="role">Role/Position</Label>
                                    <Input
                                        id="role"
                                        name="role"
                                        value={newActivity.role}
                                        onChange={handleInputChange}
                                        placeholder="e.g., President"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="startDate">Start Date</Label>
                                    <Input
                                        id="startDate"
                                        name="startDate"
                                        value={newActivity.startDate}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Jan 2020"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="endDate">End Date</Label>
                                    <Input
                                        id="endDate"
                                        name="endDate"
                                        value={newActivity.endDate}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Present"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        value={newActivity.description}
                                        onChange={handleInputChange}
                                        placeholder="Describe your role, responsibilities, and achievements..."
                                        className="min-h-[100px]"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <Button 
                                    type="button" 
                                    variant="outline" 
                                    onClick={handleCancelAdd}
                                >
                  Cancel
                                </Button>
                                <Button type="submit">Add Activity</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            ) : (
                <Button
                    onClick={handleAddClick}
                    className="gap-2"
                >
                    <Plus size={16} />
          Add Extra-Curricular Activity
                </Button>
            )}

            {extraCurricular.length === 0 && !isAdding && (
                <div className="text-center p-6 bg-muted rounded-lg">
                    <Activity className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-3" />
                    <h3 className="text-lg font-medium mb-2">No activities added yet</h3>
                    <p className="text-muted-foreground mb-4">
            Extra-curricular activities showcase your interests and soft skills to employers
                    </p>
                </div>
            )}
        </div>
    );
};
