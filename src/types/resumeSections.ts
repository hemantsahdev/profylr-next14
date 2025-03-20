export interface ResumeSection {
    id: string;
    title: string;
    color: string;
    icon: string;
    content?: string;
    isEditing?: boolean;
    placeholder?: string;
    type: "essential" | "additional";
  }