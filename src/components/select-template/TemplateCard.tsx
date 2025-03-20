import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Eye, Check } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

interface TemplateCardProps {
    id: string;
    name: string;
    image: string;
    isNew?: boolean;
    category: string;
    onSelect: (id: string) => void;
    onPreview: (id: string) => void;
    selected: boolean;
  }
  
const TemplateCard = ({
    id,
    name,
    image,
    isNew = false,
    category,
    onSelect,
    onPreview,
    selected,
}: TemplateCardProps) => {
    const [isHovering, setIsHovering] = useState(false);
  
    const handleSelect = () => {
        onSelect(id);
        toast("Template Selected", {
            description: `You've selected the ${name} template.`,
            duration: 3000,
        });
    };
  
    return (
        <div 
            className="relative group animate-fade-in"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <div className={cn(
                "rounded-xl overflow-hidden hover-card-animation border border-border bg-card",
                selected && "ring-2 ring-primary"
            )}>
                {isNew && (
                    <span className="new-badge animate-scale-in">New</span>
                )}
          
                <div className="template-preview aspect-[3/4] relative overflow-hidden">
                    <Image 
                        src={image} 
                        alt={name} 
                        className="object-cover w-full h-full transition-transform duration-500"
                        loading="lazy"
                        width={100}
                        height={100}
                    />
            
                    <div className={cn(
                        "absolute inset-0 bg-black/50 flex items-center justify-center gap-3 opacity-0 transition-opacity duration-300",
                        isHovering && "opacity-100"
                    )}>
                        <Button 
                            size="sm" 
                            variant="secondary" 
                            className="glass-panel" 
                            onClick={() => onPreview(id)}
                        >
                            <Eye className="mr-1 h-4 w-4" />
                Preview
                        </Button>
              
                        <Button 
                            size="sm" 
                            variant={selected ? "default" : "outline"} 
                            className={selected ? "bg-primary" : "glass-panel"} 
                            onClick={handleSelect}
                        >
                            {selected ? (
                                <>
                                    <Check className="mr-1 h-4 w-4" />
                    Selected
                                </>
                            ) : (
                                "Select"
                            )}
                        </Button>
                    </div>
                </div>
          
                <div className="p-4">
                    <div className="flex justify-between items-center">
                        <h3 className="font-medium text-lg text-card-foreground">{name}</h3>
                        <span className="text-xs font-medium text-muted-foreground px-2 py-1 bg-muted rounded-full">
                            {category}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemplateCard;