import { useFormContext } from "@/context/FormContext";

/**
 * Custom hook to track and display form progress
 */
export const useFormProgress = () => {
    const { formProgress, isDirty } = useFormContext();
  
    // Progress status text based on percentage
    const getProgressStatus = (): string => {
        if (formProgress === 0) return "Not started";
        if (formProgress < 33) return "Just begun";
        if (formProgress < 66) return "Making progress";
        if (formProgress < 100) return "Almost there";
        return "Complete";
    };
  
    // Color for progress indicator
    const getProgressColor = (): string => {
        if (formProgress < 33) return "bg-red-400";
        if (formProgress < 66) return "bg-amber-400";
        if (formProgress < 100) return "bg-blue-400";
        return "bg-emerald-400";
    };
  
    // Badge status for form
    const getBadgeStatus = (): { label: string; color: string } => {
        if (isDirty) {
            return { label: "Unsaved changes", color: "bg-amber-100 text-amber-800" };
        }
    
        if (formProgress === 100) {
            return { label: "Ready to submit", color: "bg-emerald-100 text-emerald-800" };
        }
    
        if (formProgress > 0) {
            return { label: "In progress", color: "bg-blue-100 text-blue-800" };
        }
    
        return { label: "Not started", color: "bg-gray-100 text-gray-800" };
    };
  
    return {
        progress: formProgress,
        status: getProgressStatus(),
        color: getProgressColor(),
        badge: getBadgeStatus(),
        isDirty
    };
};
