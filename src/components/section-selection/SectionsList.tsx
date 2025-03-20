import { useDraggable } from "@dnd-kit/core";
import { 
    Award, Book, Briefcase, Code, FileText, 
    Folder, Globe, GraduationCap, Heart, 
    HelpingHand, User, Users, Trophy, GripVertical, Search
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { RESUME_SECTIONS } from "./SectionSelection";
import { ScrollArea } from "../ui/scroll-area";


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

const SectionsList = () => {
    const [searchTerm, setSearchTerm] = useState("");

    // Filter sections based on search term
    const filteredSections = RESUME_SECTIONS.filter(section => 
        section.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Group sections by category for better organization
    const essentialSections = filteredSections.filter(section => 
        section.type === "essential"
    );
  
    const additionalSections = filteredSections.filter(section => 
        section.type === "additional"
    );

    return (
        <div className="p-6 bg-white rounded-xl shadow-sm border ">
            <h2 className="text-lg font-medium text-gray-700 mb-4">Resume Sections</h2>
            <p className="text-sm text-gray-500 mb-4">Drag and drop sections to build your resume</p>
      
            <div className="relative mb-6">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search sections..."
                    className="pl-9 bg-muted/50 border-muted"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <ScrollArea className="h-[50vh] pr-4 relative 2xl:h-[54vh] overflow-y-auto">
                {essentialSections.length > 0 && (
                    <>
                        <h3 className="text-sm font-medium text-gray-600 mb-3">Essential Sections</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                            {essentialSections.map((section) => (
                                <DraggableSection key={section.id} section={section} />
                            ))}
                        </div>
                    </>
                )}
      
                {additionalSections.length > 0 && (
                    <>
                        <h3 className="text-sm font-medium text-gray-600 mb-3">Additional Sections</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {additionalSections.map((section) => (
                                <DraggableSection key={section.id} section={section} />
                            ))}
                        </div>
                    </>
                )}
      
                {filteredSections.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
          No matching sections found
                    </div>
                )}
            </ScrollArea>

        </div>
    );
};



const DraggableSection = ({ section }: { section: typeof RESUME_SECTIONS[0] }) => {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: section.id,
    });

    return (
        <motion.div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={{
                borderColor: section.color,
                opacity: isDragging ? 0.5 : 1
            }}
            className="bg-white p-4 rounded-lg cursor-grab border-l-4 shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <div className="mr-3 text-gray-600">{iconMap[section.icon]}</div>
            <span className="font-medium text-gray-700">{section.title}</span>
            <GripVertical className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-gray-400" size={16} />
        </motion.div>
    );
};

export default SectionsList;