import { Sparkles } from "lucide-react";
import { Template } from "@/app/resume/select-template/page";
import TemplateCard from "./TemplateCard";

interface RecommendedSectionProps {
    templates: Template[];
    selectedTemplate: string;
    onSelect: (id: string) => void;
    onPreview: (id: string) => void;
  }
  
const RecommendedSection = ({
    templates,
    selectedTemplate,
    onSelect,
    onPreview,
}: RecommendedSectionProps) => {
    return (
        <section className="mt-12 animate-fade-in">
            <div className="flex items-center mb-6">
                <Sparkles className="h-5 w-5 mr-2 text-primary" />
                <h2 className="text-2xl font-medium text-foreground">Recommended for You</h2>
            </div>
        
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {templates.slice(0, 4).map((template) => (
                    <TemplateCard
                        key={template.id}
                        id={template.id}
                        name={template.name}
                        image={template.image}
                        isNew={template.isNew}
                        category={template.category}
                        onSelect={onSelect}
                        onPreview={onPreview}
                        selected={selectedTemplate === template.id}
                    />
                ))}
            </div>
        </section>
    );
};
  
export default RecommendedSection;
  