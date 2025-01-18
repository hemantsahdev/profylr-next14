import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface ProjectCardProps {
  project: {
    name: string
    technologies: string
    from: Date
    to: Date
    description: string[]
    repository?: string
    liveLink?: string
  }
  onEdit: () => void
  onDelete: () => void
}

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
    return (
        <Card className="mb-4">
            <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="font-semibold text-lg">{project.name}</h3>
                        <p className="text-sm text-muted-foreground">Technologies: {project.technologies}</p>
                        <p className="text-sm text-muted-foreground">
              Duration: {project.from.toLocaleDateString()} to {project.to.toLocaleDateString()}
                        </p>
                        {project.repository && (
                            <p className="text-sm">
                Repository:{" "}
                                <a href={project.repository} className="text-primary hover:underline">
                                    {project.repository}
                                </a>
                            </p>
                        )}
                        {project.liveLink && (
                            <p className="text-sm">
                Live Link:{" "}
                                <a href={project.liveLink} className="text-primary hover:underline">
                                    {project.liveLink}
                                </a>
                            </p>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={onEdit}>
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={onDelete}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                <ul className="list-disc pl-4 space-y-1">
                    {project.description.map((point, index) => (
                        <li key={index} className="text-sm">
                            {point}
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}

