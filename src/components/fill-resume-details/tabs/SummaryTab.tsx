import React from "react";
import { useFormContext } from "@/context/FormContext";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileText } from "lucide-react";

export const SummaryTab = () => {
    const { formData, updateField } = useFormContext();

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        // Fix: providing the correct three arguments to updateField
        // The first argument is the section, the second is the field, and the third is the value
        updateField("summary", "summary", e.target.value);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h2 className="text-xl font-medium mb-4">Professional Summary</h2>
                <p className="text-muted-foreground mb-6">
          Provide a compelling overview of your professional background and career objectives
                </p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="summary" className="flex items-center gap-2">
                        <FileText size={14} />
            Career Summary
                    </Label>
                    <Textarea
                        id="summary"
                        placeholder="Write a concise summary of your professional background, skills, and career goals..."
                        value={formData.summary || ""}
                        onChange={handleChange}
                        className="min-h-[200px] input-focus"
                    />
                    <p className="text-xs text-muted-foreground">
            A compelling summary increases your resume&apos;s impact. Keep it under 4-6 sentences and highlight your most relevant qualifications.
                    </p>
                </div>
            </div>
        </div>
    );
};
