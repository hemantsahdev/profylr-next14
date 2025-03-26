import React from "react";
import { TabId, useFormContext } from "@/context/FormContext";
import { cn } from "@/lib/utils";
import { 
    User, FileText, GraduationCap, Code, FolderKanban, 
    Briefcase, Award, Trophy, Activity, 
    CheckCircle
} from "lucide-react";

interface NavItemProps {
    id: TabId;
    label: string;
    icon: React.ReactNode;
    isComplete?: boolean;
  }
  
export const FormNavigation = () => {
    const { activeTab, setActiveTab, formData } = useFormContext();
  
    // Define tabs with their icons
    const tabs: NavItemProps[] = [
        { 
            id: "personal-info", 
            label: "Personal Info", 
            icon: <User size={18} />, 
            isComplete: Object.values(formData.personalInfo).some(val => val !== "")
        },
        { 
            id: "summary", 
            label: "Summary", 
            icon: <FileText size={18} /> 
        },
        { 
            id: "education", 
            label: "Education", 
            icon: <GraduationCap size={18} />,
            isComplete: formData.education.length > 0
        },
        { 
            id: "technical-skills", 
            label: "Technical Skills", 
            icon: <Code size={18} /> 
        },
        { 
            id: "projects", 
            label: "Projects", 
            icon: <FolderKanban size={18} />,
            isComplete: formData.projects.length > 0
        },
        { 
            id: "work-experiences", 
            label: "Work Experiences", 
            icon: <Briefcase size={18} /> 
        },
        { 
            id: "certifications", 
            label: "Certifications", 
            icon: <Award size={18} /> 
        },
        { 
            id: "achievements-awards", 
            label: "Achievements", 
            icon: <Trophy size={18} /> 
        },
        { 
            id: "extra-curricular", 
            label: "Extra Curricular", 
            icon: <Activity size={18} /> 
        },
    ];
  
    return (
        <div className="h-full flex-shrink-0 overflow-y-auto">
            <div className="flex flex-col space-y-2 w-56">
                {tabs.map((tab) => (
                    <NavItem
                        key={tab.id}
                        id={tab.id}
                        label={tab.label}
                        icon={tab.icon}
                        isComplete={tab.isComplete}
                        isActive={activeTab === tab.id}
                        onClick={() => setActiveTab(tab.id)}
                    />
                ))}
            </div>
        </div>
    );
};
  
const NavItem: React.FC<NavItemProps & { 
    isActive: boolean; 
    onClick: () => void;
  }> = ({ 
      id, 
      label, 
      icon, 
      isActive, 
      isComplete, 
      onClick 
  }) => {
      return (
          <button
              type="button"
              onClick={onClick}
              className={cn(
                  "group relative flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 focus-ring border",
                  isActive 
                      ? "bg-primary text-primary-foreground border-primary shadow-sm" 
                      : "hover:bg-secondary/80 border-transparent"
              )}
          >
              <span className={cn(
                  "flex items-center justify-center",
                  isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
              )}>
                  {icon}
              </span>
        
              <span className={cn(
                  "font-semibold",
                  isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
              )}>
                  {label}
              </span>
        
              {isComplete && (
                  <span className={cn(
                      "ml-auto",
                      isActive ? "text-primary-foreground/80" : "text-emerald-500"
                  )}>
                      <CheckCircle size={16} />
                  </span>
              )}
          </button>
      );
  };
  
