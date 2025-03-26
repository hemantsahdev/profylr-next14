import React from "react";
import { useFormContext } from "@/context/FormContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
    User, Mail, Phone, MapPin, Globe, Github, Linkedin
} from "lucide-react";

export const PersonalInfoTab = () => {
    const { formData, updateField } = useFormContext();
    const { personalInfo } = formData;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        updateField("personalInfo", name, value);
    };

    return (
        <div className=" space-y-6 animate-fade-in">
            <div>
                <h2 className="text-xl font-medium mb-4">Personal Information</h2>
                <p className="text-muted-foreground mb-6">
          Add your personal details to help employers contact you
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                    <Label htmlFor="fullName" className="flex items-center gap-2">
                        <User size={14} />
            Full Name
                    </Label>
                    <Input
                        id="fullName"
                        name="fullName"
                        placeholder="John Doe"
                        value={personalInfo.fullName}
                        onChange={handleChange}
                        className="input-focus"
                    />
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail size={14} />
            Email
                    </Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john.doe@example.com"
                        value={personalInfo.email}
                        onChange={handleChange}
                        className="input-focus"
                    />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone size={14} />
            Phone
                    </Label>
                    <Input
                        id="phone"
                        name="phone"
                        placeholder="+1 (123) 456-7890"
                        value={personalInfo.phone}
                        onChange={handleChange}
                        className="input-focus"
                    />
                </div>

                {/* Location */}
                <div className="space-y-2">
                    <Label htmlFor="location" className="flex items-center gap-2">
                        <MapPin size={14} />
            Location
                    </Label>
                    <Input
                        id="location"
                        name="location"
                        placeholder="San Francisco, CA"
                        value={personalInfo.location}
                        onChange={handleChange}
                        className="input-focus"
                    />
                </div>

                {/* Website */}
                <div className="space-y-2">
                    <Label htmlFor="website" className="flex items-center gap-2">
                        <Globe size={14} />
            Website (Optional)
                    </Label>
                    <Input
                        id="website"
                        name="website"
                        placeholder="https://yourportfolio.com"
                        value={personalInfo.website}
                        onChange={handleChange}
                        className="input-focus"
                    />
                </div>

                {/* GitHub */}
                <div className="space-y-2">
                    <Label htmlFor="github" className="flex items-center gap-2">
                        <Github size={14} />
            GitHub (Optional)
                    </Label>
                    <Input
                        id="github"
                        name="github"
                        placeholder="https://github.com/yourusername"
                        value={personalInfo.github}
                        onChange={handleChange}
                        className="input-focus"
                    />
                </div>

                {/* LinkedIn */}
                <div className="space-y-2">
                    <Label htmlFor="linkedin" className="flex items-center gap-2">
                        <Linkedin size={14} />
            LinkedIn (Optional)
                    </Label>
                    <Input
                        id="linkedin"
                        name="linkedin"
                        placeholder="https://linkedin.com/in/yourusername"
                        value={personalInfo.linkedin}
                        onChange={handleChange}
                        className="input-focus"
                    />
                </div>
            </div>

            {/* About Me */}
            <div className="space-y-2  ">
                <Label htmlFor="aboutMe" className="flex items-center gap-2">
          About Me
                </Label>
                <Textarea
                    id="aboutMe"
                    name="aboutMe"
                    placeholder="Write a brief introduction about yourself..."
                    value={personalInfo.aboutMe}
                    onChange={handleChange}
                    className="min-h-[120px] input-focus resize-none"
                />
                <p className="text-xs text-muted-foreground">
          A brief summary of your professional profile and career objectives.
                </p>
            </div>
        </div>
    );
};
