"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

// Define tab types
export type TabId = "personal-info" | "summary" | "education" | "technical-skills" | 
                   "projects" | "work-experiences" | "certifications" | 
                   "achievements-awards" | "extra-curricular";

// Define the form data structure
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string;
  role: string;
  startDate: string;
  endDate: string;
  achievements: string[];
  links: string[];
  newAchievement?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  proficiency: string;
  years: string;
  category: string;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
  achievements: string[];
  newResponsibility?: string;
  newAchievement?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuingOrganization: string;
  issueDate: string;
  expiryDate: string;
  category: string;
  credentialId: string;
  credentialUrl: string;
}

export interface Achievement {
  id: string;
  title: string;
  date: string;
  description: string;
  issuer: string;
  category: string;
  recognitionLevel: string;
}

export interface ExtraCurricular {
  id: string;
  activity: string;
  organization: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  github: string;
  linkedin: string;
  aboutMe: string;
}

export interface FormData {
  personalInfo: PersonalInfo;
  projects: Project[];
  education: Education[];
  skills: Skill[];
  workExperiences: WorkExperience[];
  certifications: Certification[];
  achievements: Achievement[];
  extraCurricular: ExtraCurricular[];
  summary: string;
  [key: string]: any;
}

// Define the context type
interface FormContextType {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  updateField: (section: string, field: string, value: any) => void;
  updateNestedField: (section: string, id: string, field: string, value: any) => void;
  addItem: (section: string, item: any) => void;
  removeItem: (section: string, id: string) => void;
  formProgress: number;
  isDirty: boolean;
  setIsDirty: (dirty: boolean) => void;
  saveForm: () => void;
  fillWithDummyData: () => void;
}

// Create the context
const FormContext = createContext<FormContextType | undefined>(undefined);

// Initial form data
const initialFormData: FormData = {
    personalInfo: {
        fullName: "",
        email: "",
        phone: "",
        location: "",
        website: "",
        github: "",
        linkedin: "",
        aboutMe: "",
    },
    projects: [],
    education: [],
    skills: [],
    workExperiences: [],
    certifications: [],
    achievements: [],
    extraCurricular: [],
    summary: "",
};

// Dummy data for quick form filling
const dummyFormData: FormData = {
    personalInfo: {
        fullName: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        website: "johndoe.com",
        github: "github.com/johndoe",
        linkedin: "linkedin.com/in/johndoe",
        aboutMe: "Full-stack developer with 5+ years of experience in web technologies.",
    },
    projects: [
        {
            id: uuidv4(),
            title: "E-commerce Platform",
            description: "Built a full-featured e-commerce platform with payment integration",
            technologies: "React, Node.js, MongoDB, Stripe",
            role: "Lead Developer",
            startDate: "2022-01",
            endDate: "2022-06",
            achievements: ["Increased sales by 25%", "Reduced page load time by 40%"],
            links: ["https://example-ecommerce.com", "https://github.com/johndoe/ecommerce"]
        },
        {
            id: uuidv4(),
            title: "Task Management App",
            description: "Developed a collaborative task management application",
            technologies: "Vue.js, Firebase, Tailwind CSS",
            role: "Frontend Developer",
            startDate: "2021-08",
            endDate: "2021-12",
            achievements: ["Implemented real-time updates", "Designed responsive mobile interface"],
            links: ["https://tasker-app.com"]
        }
    ],
    education: [
        {
            id: uuidv4(),
            institution: "Stanford University",
            degree: "Master of Science",
            field: "Computer Science",
            startDate: "2016-09",
            endDate: "2018-06",
            gpa: "3.8",
            description: "Specialized in Artificial Intelligence and Machine Learning"
        },
        {
            id: uuidv4(),
            institution: "University of California, Berkeley",
            degree: "Bachelor of Science",
            field: "Computer Engineering",
            startDate: "2012-09",
            endDate: "2016-05",
            gpa: "3.9",
            description: "Dean's List for all semesters"
        }
    ],
    skills: [
        {
            id: uuidv4(),
            name: "JavaScript",
            proficiency: "Expert",
            years: "6",
            category: "Frontend"
        },
        {
            id: uuidv4(),
            name: "React",
            proficiency: "Expert",
            years: "5",
            category: "Frontend"
        },
        {
            id: uuidv4(),
            name: "Node.js",
            proficiency: "Advanced",
            years: "4",
            category: "Backend"
        },
        {
            id: uuidv4(),
            name: "Python",
            proficiency: "Intermediate",
            years: "3",
            category: "Backend"
        },
        {
            id: uuidv4(),
            name: "AWS",
            proficiency: "Advanced",
            years: "4",
            category: "DevOps"
        }
    ],
    workExperiences: [
        {
            id: uuidv4(),
            jobTitle: "Senior Software Engineer",
            company: "Google",
            location: "Mountain View, CA",
            startDate: "2021-03",
            endDate: "Present",
            responsibilities: [
                "Lead a team of 5 developers",
                "Architect scalable solutions for enterprise clients",
                "Implement CI/CD pipelines"
            ],
            achievements: [
                "Reduced system downtime by 99%",
                "Launched 3 major features in 6 months"
            ]
        },
        {
            id: uuidv4(),
            jobTitle: "Software Engineer",
            company: "Facebook",
            location: "Menlo Park, CA",
            startDate: "2018-07",
            endDate: "2021-02",
            responsibilities: [
                "Developed frontend components with React",
                "Optimized application performance",
                "Collaborated with designers on UI/UX improvements"
            ],
            achievements: [
                "Improved page load speed by 40%",
                "Contributed to open-source projects"
            ]
        }
    ],
    certifications: [
        {
            id: uuidv4(),
            name: "AWS Certified Solutions Architect",
            issuingOrganization: "Amazon Web Services",
            issueDate: "2020-05",
            expiryDate: "2023-05",
            category: "Cloud",
            credentialId: "AWS-12345",
            credentialUrl: "https://aws.amazon.com/verification"
        },
        {
            id: uuidv4(),
            name: "Google Professional Cloud Developer",
            issuingOrganization: "Google",
            issueDate: "2019-11",
            expiryDate: "2022-11",
            category: "Cloud",
            credentialId: "GCP-67890",
            credentialUrl: "https://cloud.google.com/certification/verification"
        }
    ],
    achievements: [
        {
            id: uuidv4(),
            title: "Innovation Award",
            date: "2022-03",
            description: "Recognized for developing an AI-powered customer service solution",
            issuer: "Google",
            category: "Professional",
            recognitionLevel: "Company-wide"
        },
        {
            id: uuidv4(),
            title: "Hackathon Winner",
            date: "2021-09",
            description: "First place in company-wide hackathon",
            issuer: "Facebook",
            category: "Technical",
            recognitionLevel: "Department"
        }
    ],
    extraCurricular: [
        {
            id: uuidv4(),
            activity: "Tech Meetup Organizer",
            organization: "Bay Area JavaScript Developers",
            role: "Lead Organizer",
            startDate: "2020-01",
            endDate: "Present",
            description: "Organize monthly tech talks and networking events for 300+ developers"
        },
        {
            id: uuidv4(),
            activity: "Volunteer Coding Instructor",
            organization: "Code.org",
            role: "Instructor",
            startDate: "2019-06",
            endDate: "2020-12",
            description: "Taught programming basics to underprivileged high school students"
        }
    ],
    summary: "Results-driven Senior Software Engineer with 6+ years of experience in full-stack development. Proficient in JavaScript, React, and Node.js with a strong background in developing scalable applications. Passionate about clean code, performance optimization, and delivering exceptional user experiences. Proven track record of leading teams and delivering projects on time and under budget."
};

// Create a provider component
export const FormProvider = ({ children }: { children: ReactNode }) => {
    const [activeTab, setActiveTab] = useState<TabId>("personal-info");
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [isDirty, setIsDirty] = useState(false);
    const [formProgress, setFormProgress] = useState(0);

    // Update form field
    const updateField = (section: string, field: string, value: any) => {
        setFormData((prev) => {
            const newData = { 
                ...prev, 
                [section]: { 
                    ...prev[section], 
                    [field]: value 
                } 
            };
            return newData;
        });
        setIsDirty(true);
    };

    // Update nested field (for arrays of objects)
    const updateNestedField = (section: string, id: string, field: string, value: any) => {
        setFormData((prev) => {
            const items = [...prev[section]];
            const index = items.findIndex(item => item.id === id);
            if (index !== -1) {
                items[index] = { ...items[index], [field]: value };
            }
            return { ...prev, [section]: items };
        });
        setIsDirty(true);
    };

    // Add item to an array
    const addItem = (section: string, item: any) => {
        setFormData((prev) => {
            return { ...prev, [section]: [...prev[section], item] };
        });
        setIsDirty(true);
    };

    // Remove item from an array
    const removeItem = (section: string, id: string) => {
        setFormData((prev) => {
            const filtered = prev[section].filter((item: any) => item.id !== id);
            return { ...prev, [section]: filtered };
        });
        setIsDirty(true);
    };

    // Fill form with dummy data
    const fillWithDummyData = () => {
        setFormData(dummyFormData);
        setIsDirty(true);
        toast.success("Form filled with dummy data");
    };

    // Load data from local storage
    useEffect(() => {
        const savedData = localStorage.getItem("resumeFormData");
        if (savedData) {
            try {
                const parsedData = JSON.parse(savedData);
                const completeData = {
                    ...initialFormData,
                    ...parsedData
                };
                setFormData(completeData);
            } catch (error) {
                console.error("Failed to parse saved form data:", error);
            }
        }
    }, []);

    // Calculate form progress
    useEffect(() => {
        let filledFields = 0;
        let totalFields = 0;
    
        Object.values(formData.personalInfo).forEach(value => {
            totalFields++;
            if (value) filledFields++;
        });
    
        totalFields += 1;
        if (formData.projects && formData.projects.length > 0) filledFields++;
    
        totalFields += 1;
        if (formData.education && formData.education.length > 0) filledFields++;
    
        totalFields += 1;
        if (formData.skills && formData.skills.length > 0) filledFields++;
    
        totalFields += 1;
        if (formData.workExperiences && formData.workExperiences.length > 0) filledFields++;
    
        totalFields += 1;
        if (formData.certifications && formData.certifications.length > 0) filledFields++;
    
        totalFields += 1;
        if (formData.achievements && formData.achievements.length > 0) filledFields++;
    
        totalFields += 1;
        if (formData.extraCurricular && formData.extraCurricular.length > 0) filledFields++;
    
        totalFields += 1;
        if (formData.summary) filledFields++;
    
        const progress = totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0;
        setFormProgress(progress);
    }, [formData]);

    // Auto-save when form is dirty
    useEffect(() => {
        if (isDirty) {
            const timeout = setTimeout(() => {
                localStorage.setItem("resumeFormData", JSON.stringify(formData));
                setIsDirty(false);
            }, 1000);
      
            return () => clearTimeout(timeout);
        }
    }, [formData, isDirty]);

    // Manual save function
    const saveForm = () => {
        localStorage.setItem("resumeFormData", JSON.stringify(formData));
        setIsDirty(false);
        toast.success("Form saved successfully");
    };

    return (
        <FormContext.Provider value={{
            activeTab,
            setActiveTab,
            formData,
            setFormData,
            updateField,
            updateNestedField,
            addItem,
            removeItem,
            formProgress,
            isDirty,
            setIsDirty,
            saveForm,
            fillWithDummyData,
        }}>
            {children}
        </FormContext.Provider>
    );
};

// Create a hook to use the form context
export const useFormContext = () => {
    const context = useContext(FormContext);
    if (context === undefined) {
        throw new Error("useFormContext must be used within a FormProvider");
    }
    return context;
};
