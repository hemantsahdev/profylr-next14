import React, { useState } from "react";
import { useFormContext, Project } from "@/context/FormContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
    Plus, Trash2, FolderKanban, Calendar, Link, Code, 
    User, Award, PanelRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const ProjectsTab = () => {
    const { formData, addItem, removeItem, updateNestedField } = useFormContext();
    const { projects } = formData;
    const [showAddForm, setShowAddForm] = useState(false);
    const [newProject, setNewProject] = useState<Omit<Project, "id">>({
        title: "",
        description: "",
        technologies: "",
        role: "",
        startDate: "",
        endDate: "",
        achievements: [],
        links: [],
    });
    const [newAchievement, setNewAchievement] = useState("");
    const [newLink, setNewLink] = useState("");

    const handleAddProject = () => {
        const projectWithId = {
            ...newProject,
            id: crypto.randomUUID(),
        };
    
        addItem("projects", projectWithId);
        setNewProject({
            title: "",
            description: "",
            technologies: "",
            role: "",
            startDate: "",
            endDate: "",
            achievements: [],
            links: [],
        });
        setShowAddForm(false);
    };

    const handleAddAchievement = () => {
        if (newAchievement.trim()) {
            setNewProject({
                ...newProject,
                achievements: [...newProject.achievements, newAchievement.trim()]
            });
            setNewAchievement("");
        }
    };

    const handleRemoveAchievement = (index: number) => {
        setNewProject({
            ...newProject,
            achievements: newProject.achievements.filter((_, i) => i !== index)
        });
    };

    const handleAddLink = () => {
        if (newLink.trim()) {
            setNewProject({
                ...newProject,
                links: [...newProject.links, newLink.trim()]
            });
            setNewLink("");
        }
    };

    const handleRemoveLink = (index: number) => {
        setNewProject({
            ...newProject,
            links: newProject.links.filter((_, i) => i !== index)
        });
    };

    const handleProjectChange = (id: string, field: string, value: any) => {
        updateNestedField("projects", id, field, value);
    };

    const handleAddExistingAchievement = (projectId: string, achievement: string) => {
        const project = projects.find(p => p.id === projectId);
        if (project && achievement.trim()) {
            updateNestedField(
                "projects", 
                projectId, 
                "achievements", 
                [...project.achievements, achievement.trim()]
            );
        }
    };

    const handleRemoveExistingAchievement = (projectId: string, index: number) => {
        const project = projects.find(p => p.id === projectId);
        if (project) {
            updateNestedField(
                "projects",
                projectId,
                "achievements",
                project.achievements.filter((_, i) => i !== index)
            );
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h2 className="text-xl font-medium mb-4">Projects</h2>
                <p className="text-muted-foreground mb-6">
          Add details about your projects, personal or professional
                </p>
            </div>

            {projects.length > 0 && (
                <div className="space-y-4 mb-8">
                    {projects.map((project) => (
                        <Card key={project.id} className="overflow-hidden group">
                            <CardHeader className="bg-secondary/50 py-4">
                                <div className="flex items-start justify-between">
                                    <CardTitle className="text-lg font-medium">
                                        {project.title || "Untitled Project"}
                                    </CardTitle>
                                    <Button 
                                        variant="ghost" 
                                        size="icon"
                                        className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => removeItem("projects", project.id)}
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-4 pb-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor={`title-${project.id}`} className="flex items-center gap-2">
                                                <FolderKanban size={14} />
                        Project Title
                                            </Label>
                                            <Input
                                                id={`title-${project.id}`}
                                                value={project.title}
                                                onChange={(e) => handleProjectChange(project.id, "title", e.target.value)}
                                                className="input-focus"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor={`description-${project.id}`}>
                        Description
                                            </Label>
                                            <Textarea
                                                id={`description-${project.id}`}
                                                value={project.description}
                                                onChange={(e) => handleProjectChange(project.id, "description", e.target.value)}
                                                className="min-h-[80px] input-focus resize-none"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor={`startDate-${project.id}`} className="flex items-center gap-2">
                                                    <Calendar size={14} />
                          Start Date
                                                </Label>
                                                <Input
                                                    id={`startDate-${project.id}`}
                                                    type="date"
                                                    value={project.startDate}
                                                    onChange={(e) => handleProjectChange(project.id, "startDate", e.target.value)}
                                                    className="input-focus"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor={`endDate-${project.id}`} className="flex items-center gap-2">
                                                    <Calendar size={14} />
                          End Date
                                                </Label>
                                                <Input
                                                    id={`endDate-${project.id}`}
                                                    type="date"
                                                    value={project.endDate}
                                                    onChange={(e) => handleProjectChange(project.id, "endDate", e.target.value)}
                                                    className="input-focus"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor={`technologies-${project.id}`} className="flex items-center gap-2">
                                                <Code size={14} />
                        Technologies Used
                                            </Label>
                                            <Input
                                                id={`technologies-${project.id}`}
                                                value={project.technologies}
                                                onChange={(e) => handleProjectChange(project.id, "technologies", e.target.value)}
                                                placeholder="React, Node.js, MongoDB, etc."
                                                className="input-focus"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor={`role-${project.id}`} className="flex items-center gap-2">
                                                <User size={14} />
                        Your Role
                                            </Label>
                                            <Input
                                                id={`role-${project.id}`}
                                                value={project.role}
                                                onChange={(e) => handleProjectChange(project.id, "role", e.target.value)}
                                                placeholder="Developer, Designer, Project Manager, etc."
                                                className="input-focus"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="flex items-center gap-2">
                                                <Link size={14} />
                        Project Links
                                            </Label>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {project.links.map((link, index) => (
                                                    <Badge 
                                                        key={index} 
                                                        variant="secondary"
                                                        className="group/badge cursor-default"
                                                    >
                                                        <a 
                                                            href={link} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="hover:underline mr-1"
                                                        >
                                                            {new URL(link).hostname}
                                                        </a>
                                                        <button
                                                            type="button"
                                                            aria-label="Remove link"
                                                            onClick={() => {
                                                                updateNestedField(
                                                                    "projects",
                                                                    project.id,
                                                                    "links",
                                                                    project.links.filter((_, i) => i !== index)
                                                                );
                                                            }}
                                                            className="text-muted-foreground hover:text-destructive opacity-0 group-hover/badge:opacity-100 transition-opacity"
                                                        >
                                                            <Trash2 size={12} />
                                                        </button>
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <Label className="flex items-center gap-2 mb-3">
                                        <Award size={14} />
                    Key Achievements
                                    </Label>
                                    <div className="space-y-3">
                                        {project.achievements.map((achievement, index) => (
                                            <div key={index} className="flex items-start gap-2">
                                                <div className="w-1 h-1 rounded-full bg-primary mt-2"></div>
                                                <div className="flex-1 text-sm">{achievement}</div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-muted-foreground h-6 w-6"
                                                    onClick={() => handleRemoveExistingAchievement(project.id, index)}
                                                >
                                                    <Trash2 size={14} />
                                                </Button>
                                            </div>
                                        ))}

                                        <div className="flex items-center gap-2 mt-2">
                                            <Input
                                                placeholder="Add an achievement..."
                                                value={project.newAchievement || ""}
                                                onChange={(e) => handleProjectChange(project.id, "newAchievement", e.target.value)}
                                                className="input-focus text-sm"
                                            />
                                            <Button
                                                type="button"
                                                size="sm"
                                                variant="outline"
                                                onClick={() => {
                                                    const achievement = project.newAchievement;
                                                    if (achievement && achievement.trim()) {
                                                        handleAddExistingAchievement(project.id, achievement);
                                                        handleProjectChange(project.id, "newAchievement", "");
                                                    }
                                                }}
                                            >
                                                <Plus size={14} className="mr-1" /> Add
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {showAddForm ? (
                <Card className="border-dashed border-primary/40 bg-secondary/30 overflow-hidden">
                    <CardHeader className="bg-secondary/50 py-4">
                        <CardTitle className="text-lg font-medium">Add New Project</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 pb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="new-title" className="flex items-center gap-2">
                                        <FolderKanban size={14} />
                    Project Title
                                    </Label>
                                    <Input
                                        id="new-title"
                                        value={newProject.title}
                                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                                        placeholder="My Awesome Project"
                                        className="input-focus"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="new-description">
                    Description
                                    </Label>
                                    <Textarea
                                        id="new-description"
                                        value={newProject.description}
                                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                        placeholder="A brief description of your project..."
                                        className="min-h-[80px] input-focus resize-none"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="new-startDate" className="flex items-center gap-2">
                                            <Calendar size={14} />
                      Start Date
                                        </Label>
                                        <Input
                                            id="new-startDate"
                                            type="date"
                                            value={newProject.startDate}
                                            onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
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
                                            value={newProject.endDate}
                                            onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
                                            className="input-focus"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="new-technologies" className="flex items-center gap-2">
                                        <Code size={14} />
                    Technologies Used
                                    </Label>
                                    <Input
                                        id="new-technologies"
                                        value={newProject.technologies}
                                        onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                                        placeholder="React, Node.js, MongoDB, etc."
                                        className="input-focus"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="new-role" className="flex items-center gap-2">
                                        <User size={14} />
                    Your Role
                                    </Label>
                                    <Input
                                        id="new-role"
                                        value={newProject.role}
                                        onChange={(e) => setNewProject({ ...newProject, role: e.target.value })}
                                        placeholder="Developer, Designer, Project Manager, etc."
                                        className="input-focus"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <Link size={14} />
                    Project Links
                                    </Label>
                                    <div className="flex items-center gap-2">
                                        <Input
                                            value={newLink}
                                            onChange={(e) => setNewLink(e.target.value)}
                                            placeholder="https://your-project-url.com"
                                            className="input-focus flex-1"
                                        />
                                        <Button
                                            type="button"
                                            size="sm"
                                            variant="outline"
                                            onClick={handleAddLink}
                                        >
                                            <Plus size={14} className="mr-1" /> Add
                                        </Button>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {newProject.links.map((link, index) => (
                                            <Badge 
                                                key={index} 
                                                variant="secondary"
                                                className="group/badge cursor-default"
                                            >
                                                {new URL(link).hostname}
                                                <button
                                                    type="button"
                                                    aria-label="Remove link"
                                                    onClick={() => handleRemoveLink(index)}
                                                    className="ml-1 text-muted-foreground hover:text-destructive opacity-0 group-hover/badge:opacity-100 transition-opacity"
                                                >
                                                    <Trash2 size={12} />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Label className="flex items-center gap-2 mb-3">
                                <Award size={14} />
                Key Achievements
                            </Label>
                            <div className="space-y-3">
                                {newProject.achievements.map((achievement, index) => (
                                    <div key={index} className="flex items-start gap-2">
                                        <div className="w-1 h-1 rounded-full bg-primary mt-2"></div>
                                        <div className="flex-1 text-sm">{achievement}</div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-muted-foreground h-6 w-6"
                                            onClick={() => handleRemoveAchievement(index)}
                                        >
                                            <Trash2 size={14} />
                                        </Button>
                                    </div>
                                ))}

                                <div className="flex items-center gap-2 mt-2">
                                    <Input
                                        placeholder="Add an achievement..."
                                        value={newAchievement}
                                        onChange={(e) => setNewAchievement(e.target.value)}
                                        className="input-focus text-sm"
                                    />
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant="outline"
                                        onClick={handleAddAchievement}
                                    >
                                        <Plus size={14} className="mr-1" /> Add
                                    </Button>
                                </div>
                            </div>
                        </div>

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
                                onClick={handleAddProject}
                                disabled={!newProject.title.trim()}
                            >
                Add Project
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
          Add New Project
                </Button>
            )}
        </div>
    );
};
