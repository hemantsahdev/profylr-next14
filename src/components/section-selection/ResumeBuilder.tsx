import { useDroppable } from "@dnd-kit/core";
import { 
    SortableContext, 
    verticalListSortingStrategy,
    useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Award, Book, Briefcase, Code, Eye, FileText, Folder, Globe, GraduationCap, Heart, HelpingHand, User, Users, Trophy, GripVertical, X, Save, Edit2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ResumeSection } from "@/types/resumeSections";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface ResumeBuilderProps {
  sections: ResumeSection[];
  onRemoveSection: (id: string) => void;
  onReorderSections: (sections: ResumeSection[]) => void;
  onUpdateSection?: (id: string, content: string) => void;
}

const ResumeBuilder = ({ 
    sections, 
    onRemoveSection,
    onReorderSections,
    onUpdateSection 
}: ResumeBuilderProps) => {
    const { setNodeRef, isOver } = useDroppable({
        id: "resume-drop-area",
    });
  
    const [isPreviewMode, setIsPreviewMode] = useState(false);

    // Compute the styles for the drop area based on the drag state
    const dropAreaClasses = `
    p-6 rounded-xl border-2 transition-all duration-300
    ${isOver 
        ? "border-indigo-400 bg-indigo-50/80" 
        : "border-dashed border-gray-200 bg-white"
}
    ${sections.length === 0 ? "min-h-[70vh] flex flex-col items-center justify-center" : ""}
  `;

    const togglePreviewMode = () => {
        setIsPreviewMode(!isPreviewMode);
        toast.success(isPreviewMode ? "Editing enabled" : "Preview mode activated");
    };

    return (
        <div ref={setNodeRef} className={cn(dropAreaClasses, "2xl:h-[80vh] overflow-y-hidden")}>
            {sections.length === 0 ? (
                <EmptyResumeState />
            ) : (
                <div className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b">
                        <h2 className="text-xl font-semibold text-gray-800">Resume</h2>
                        <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={togglePreviewMode}
                            className="flex items-center gap-1"
                        >
                            {isPreviewMode ? <Edit2 size={14} /> : <Eye size={14} />}
                            <span className="text-xs">{isPreviewMode ? "Edit" : "Preview"}</span>
                        </Button>
                    </div>
          
                    <p className="mt-2 text-xs text-gray-500">
    Drag and drop the sections below to customize their order for your final resume.
                    </p>
                    <ScrollArea className="h-[50vh] pr-4 relative 2xl:h-[56vh] overflow-y-auto">
                        <SortableContext 
                            items={sections.map(s => s.id)} 
                            strategy={verticalListSortingStrategy}
                        >
                            {sections.map((section) => (
                                <SortableResumeSection 
                                    key={section.id} 
                                    section={section} 
                                    onRemove={onRemoveSection}
                                    onUpdateContent={(content) => onUpdateSection && onUpdateSection(section.id, content)} 
                                    isPreviewMode={isPreviewMode}
                                />
                            ))}
                        </SortableContext>
                    </ScrollArea>
                </div>
            )}
        </div>
    );
};

// Maps icon names to Lucide icon components
const iconMap: Record<string, React.ReactNode> = {
    "user": <User size={18} />,
    "file-text": <FileText size={18} />,
    "code": <Code size={18} />,
    "graduation-cap": <GraduationCap size={18} />,
    "briefcase": <Briefcase size={18} />,
    "folder": <Folder size={18} />,
    "award": <Award size={18} />,
    "trophy": <Trophy size={18} />,
    "globe": <Globe size={18} />,
    "heart": <Heart size={18} />,
    "book": <Book size={18} />,
    "helping-hand": <HelpingHand size={18} />,
    "users": <Users size={18} />
};

const SortableResumeSection = ({ 
    section, 
    onRemove,
    onUpdateContent,
    isPreviewMode 
}: { 
  section: ResumeSection; 
  onRemove: (id: string) => void;
  onUpdateContent?: (content: string) => void;
  isPreviewMode: boolean;
}) => {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: section.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        borderLeftColor: section.color,
        cursor: isDragging ? "grabbing" : "grab",
    };

    return (
        <motion.div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="mb-3 p-4 bg-white rounded-lg border border-gray-100 border-l-4 shadow-sm"
       
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="text-gray-600">{iconMap[section.icon]}</div>
                    <h3 className="font-medium text-gray-700">{section.title}</h3>
                </div>
        
                <div className="flex items-center gap-1">
          
                    {!isPreviewMode && (
                        <>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-gray-400 hover:text-gray-600"
                                onClick={() => onRemove(section.id)}
                                title="Remove section"
                            >
                                <X size={16} />
                            </Button>
                        </>
                    )}
                </div>
            </div>
      
          
            <div className="mt-3 p-3 bg-gray-50 rounded-md border border-dashed border-gray-200 text-sm text-gray-700 min-h-[80px]">
                <div className="text-gray-400 text-center">{section.placeholder}</div>
            </div>
          
        </motion.div>
    );
};

const EmptyResumeState = () => {
    return (
        <>
            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                <FileText className="text-indigo-600" size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Your Resume is Empty</h3>
            <p className="text-gray-500 text-sm text-center max-w-xs">
        Drag and drop sections from the left panel to start building your resume
            </p>
        </>
    );
};

export default ResumeBuilder;