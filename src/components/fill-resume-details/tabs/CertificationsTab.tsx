import React, { useState } from "react";
import { useFormContext, Certification } from "@/context/FormContext";
import { v4 as uuidv4 } from "uuid";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Plus, Trash2, Award } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const CertificationsTab = () => {
    const { formData, addItem, removeItem, updateNestedField } = useFormContext();
  
    const [newCertification, setNewCertification] = useState<Partial<Certification>>({
        id: uuidv4(),
        name: "",
        issuingOrganization: "",
        issueDate: "",
        expiryDate: "",
        category: "",
        credentialId: "",
        credentialUrl: ""
    });

    const handleChange = (field: string, value: string) => {
        setNewCertification({
            ...newCertification,
            [field]: value
        });
    };

    const handleDateChange = (field: string, date: Date | undefined) => {
        if (!date) return;
        setNewCertification({
            ...newCertification,
            [field]: format(date, "yyyy-MM-dd")
        });
    };

    const addCertification = () => {
        if (!newCertification.name || !newCertification.issuingOrganization || !newCertification.issueDate) {
            return; // Require at minimum the name, organization, and issue date
        }

        addItem("certifications", newCertification as Certification);
    
        // Reset form
        setNewCertification({
            id: uuidv4(),
            name: "",
            issuingOrganization: "",
            issueDate: "",
            expiryDate: "",
            category: "",
            credentialId: "",
            credentialUrl: ""
        });
    };

    // Categories for certifications
    const certificationCategories = [
        "IT & Software",
        "Cloud Computing",
        "Data Science",
        "Project Management",
        "Web Development",
        "Mobile Development",
        "Cybersecurity",
        "Programming Languages",
        "Frameworks",
        "DevOps",
        "Other"
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Certifications</h2>
            <p className="text-muted-foreground">
        Add your professional certifications and credentials to enhance your resume.
            </p>
      
            {/* Add new certification form */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        <span>Add New Certification</span>
                    </CardTitle>
                    <CardDescription>
            Enter your certification details. Fields marked with * are required.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="cert-name">Certification Name *</Label>
                            <Input
                                id="cert-name"
                                placeholder="e.g. Certified Kubernetes Administrator (CKA)"
                                value={newCertification.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                            />
                        </div>
            
                        <div className="space-y-2">
                            <Label htmlFor="issuing-org">Issuing Organization *</Label>
                            <Input
                                id="issuing-org"
                                placeholder="e.g. Cloud Native Computing Foundation"
                                value={newCertification.issuingOrganization}
                                onChange={(e) => handleChange("issuingOrganization", e.target.value)}
                            />
                        </div>
            
                        <div className="space-y-2">
                            <Label htmlFor="issue-date">Issue Date *</Label>
                            <Popover>
                                <PopoverTrigger asChild={true}>
                                    <Button
                                        variant="outline"
                                        id="issue-date"
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !newCertification.issueDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {newCertification.issueDate ? 
                                            format(new Date(newCertification.issueDate), "PPP") : 
                                            "Select issuing date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={newCertification.issueDate ? new Date(newCertification.issueDate) : undefined}
                                        onSelect={(date) => handleDateChange("issueDate", date)}
                                        initialFocus={true}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
            
                        <div className="space-y-2">
                            <Label htmlFor="expiry-date">Expiry Date (if applicable)</Label>
                            <Popover>
                                <PopoverTrigger asChild={true}>
                                    <Button
                                        variant="outline"
                                        id="expiry-date"
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !newCertification.expiryDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {newCertification.expiryDate ? 
                                            format(new Date(newCertification.expiryDate), "PPP") : 
                                            "Select expiry date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={newCertification.expiryDate ? new Date(newCertification.expiryDate) : undefined}
                                        onSelect={(date) => handleDateChange("expiryDate", date)}
                                        initialFocus={true}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
            
                        <div className="space-y-2">
                            <Label htmlFor="cert-category">Category</Label>
                            <Select 
                                value={newCertification.category}
                                onValueChange={(value) => handleChange("category", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category of certificate" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {certificationCategories.map(category => (
                                            <SelectItem key={category} value={category}>
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
            
                        <div className="space-y-2">
                            <Label htmlFor="credential-id">Credential ID</Label>
                            <Input
                                id="credential-id"
                                placeholder="Enter credential ID"
                                value={newCertification.credentialId}
                                onChange={(e) => handleChange("credentialId", e.target.value)}
                            />
                        </div>
            
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="credential-url">Credential URL</Label>
                            <Input
                                id="credential-url"
                                placeholder="e.g. https://www.credly.com/badges/your-credential"
                                value={newCertification.credentialUrl}
                                onChange={(e) => handleChange("credentialUrl", e.target.value)}
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        className="w-full"
                        onClick={addCertification}
                        disabled={!newCertification.name || !newCertification.issuingOrganization || !newCertification.issueDate}
                    >
                        <Plus className="mr-2 h-4 w-4" />
            Add Certification
                    </Button>
                </CardFooter>
            </Card>
      
            {/* Display existing certifications */}
            {formData.certifications && formData.certifications.length > 0 ? (
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Your Certifications</h3>
                    <div className="grid grid-cols-1 gap-4">
                        {formData.certifications.map((cert) => (
                            <Card key={cert.id} className="group">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-lg">{cert.name}</CardTitle>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={() => removeItem("certifications", cert.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <CardDescription>
                                        {cert.issuingOrganization}
                                        {cert.category && ` • ${cert.category}`}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pb-4 text-sm">
                                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                                        <div className="flex items-center gap-1">
                                            <span className="font-medium">Issued:</span>
                                            <span>{format(new Date(cert.issueDate), "MMM yyyy")}</span>
                                        </div>
                    
                                        {cert.expiryDate && (
                                            <div className="flex items-center gap-1">
                                                <span className="font-medium">Expires:</span>
                                                <span>{format(new Date(cert.expiryDate), "MMM yyyy")}</span>
                                            </div>
                                        )}
                    
                                        {cert.credentialId && (
                                            <div className="flex items-center gap-1">
                                                <span className="font-medium">ID:</span>
                                                <span>{cert.credentialId}</span>
                                            </div>
                                        )}
                                    </div>
                  
                                    {cert.credentialUrl && (
                                        <div className="mt-2">
                                            <a 
                                                href={cert.credentialUrl} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-primary hover:underline inline-flex items-center gap-1"
                                            >
                        View credential
                                            </a>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center py-10 text-muted-foreground">
                    <Award className="mx-auto h-10 w-10 mb-3 opacity-50" />
                    <p>No certifications added yet. Add your first certification above.</p>
                </div>
            )}
        </div>
    );
};
