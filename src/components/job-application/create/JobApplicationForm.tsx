import { useState, useRef } from "react";
import { Formik, Form, Field } from "formik";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarDays, Trash2, Upload } from "lucide-react";
import { motion } from "framer-motion";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { cn } from "@/lib/utils";
import { jobApplicationValidation } from "@/validations/jobApplicationValidation";
import { truncateString } from "@/utils/stringUtils";

interface FormValues {
    companyName: string;
    jobTitle: string;
    jobLink: string;
    followUpDate: Date  | undefined;
    selectedResume: string;
    importedResume: File | null;
}

const initialValues: FormValues = {
    companyName: "",
    jobTitle: "",
    jobLink: "",
    followUpDate: undefined,
    selectedResume: "",
    importedResume: null,
};
const existingResumes = ["resume1.pdf", "resume2.pdf", "resume3.pdf"];

const JobApplicationForm = () => {

    const [importedResume, setImportedResume] = useState<File|null>(null);
        
    const fileInputRef = useRef<HTMLInputElement | null>(null); // Create a ref for the file input
    
        
    const handleSubmit = (values: FormValues):void => {
        console.log(values);
    };
    
    const handleImportButtonClick = (e:React.MouseEvent<HTMLButtonElement>):void => {
        e.preventDefault();
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Programmatically click the input
        }
    };
    
    const handleResumeImported = (file:File):void=>{
        console.log(file);
        setImportedResume(file);
    };
    
    const handleRemoveImportedResume = ():void=>{
        setImportedResume(null);
    };


    return (
        <Card className="w-full max-w-5xl mx-auto space-y-10 ">
            <CardHeader>
                <CardTitle className="text-3xl font-bold text-center">Job Application</CardTitle>
            </CardHeader>
            <CardContent>
                <Formik
                    initialValues={initialValues}
                    validationSchema={zodResolver(jobApplicationValidation)}
                    onSubmit={(values, actions) => {
                        handleSubmit(values);
                        // toast({
                        //     title: "Application Submitted",
                        //     description: "Your job application has been successfully submitted.",
                        // });
                        actions.resetForm();
                    }}
                >
                    {({ values, errors, touched, setFieldValue }) => (
                        <Form className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Label htmlFor="companyName">Company Name*</Label>
                                    <Field name="companyName" as={Input} id="companyName" className="mt-1" />
                                    {errors.companyName && touched.companyName && (
                                        <p className="text-sm text-red-500 mt-1">{errors.companyName}</p>
                                    )}
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.1 }}
                                >
                                    <Label htmlFor="jobTitle">Job Title*</Label>
                                    <Field name="jobTitle" as={Input} id="jobTitle" className="mt-1" />
                                    {errors.jobTitle && touched.jobTitle && (
                                        <p className="text-sm text-red-500 mt-1">{errors.jobTitle}</p>
                                    )}
                                </motion.div>
                            </div>
                
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                            >
                                <Label htmlFor="jobLink">Link to Job*</Label>
                                <Field name="jobLink" as={Input} id="jobLink" type="url" className="mt-1" />
                                {errors.jobLink && touched.jobLink && (
                                    <p className="text-sm text-red-500 mt-1">{errors.jobLink}</p>
                                )}
                            </motion.div>
  
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.3 }}
                                className="flex items-center gap-3"
                            >
                                <Label htmlFor="followUpDate">Follow-up Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild={true}>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !values.followUpDate && "text-muted-foreground"
                                            )}
                                        >
                                            {values.followUpDate ? (
                                                format(values.followUpDate, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarDays className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={values.followUpDate}
                                            onSelect={(date) => setFieldValue("followUpDate", date)}
                                            className="rounded-md border"
                                            disabled={(date) => date <= new Date()}
                                            initialFocus={true}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </motion.div>
  
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.4 }}
                            >
                                <Label htmlFor="selectedResume">Select Resume*</Label>
                                <div className="flex items-center gap-4 mt-2">
                                    {importedResume ? (
                                        <div className="flex items-center justify-between w-full p-2 border rounded-md">
                                            <p className="truncate">{truncateString(importedResume.name, 30)}</p>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => {
                                                    setFieldValue("importedResume", null);
                                                    handleRemoveImportedResume();
                                                    setImportedResume(null);
                                                }}
                                            >
                                                <Trash2 className="text-red-500 h-5 w-5" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <>
                                            <Field
                                                name="selectedResume"
                                                as="select"
                                                className="w-full border rounded-md p-2"
                                            >
                                                <option value="">Select a resume</option>
                                                {existingResumes.map((resume) => (
                                                    <option key={resume} value={resume}>
                                                        {resume}
                                                    </option>
                                                ))}
                                            </Field>
                                            <p className="text-lg text-muted-foreground font-medium">OR</p>
                                            <Button onClick={handleImportButtonClick}>
                                                <Upload className="mr-2 h-4 w-4" /> Import
                                            </Button>
                                            <Input
                                                type="file"
                                                ref={fileInputRef}
                                                onChange={(event) => {
                                                    const file = event.currentTarget.files?.[0];
                                                    setFieldValue("importedResume", file || null);
                                                    if (file) {
                                                        handleResumeImported(file);
                                                        setImportedResume(file);
                                                    }
                                                }}
                                                accept=".pdf,.doc,.docx"
                                                className="hidden"
                                            />
                                        </>
                                    )}
                                </div>
                                {errors.selectedResume && touched.selectedResume && (
                                    <p className="text-sm text-red-500 mt-1">{errors.selectedResume}</p>
                                )}
                            </motion.div>
  
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.5 }}
                                className="flex justify-end"
                            >
                                <Button type="submit" size="lg">
                    Submit Application
                                </Button>
                            </motion.div>
                        </Form>
                    )}
                </Formik>
            </CardContent>
        </Card>
    );
};

export default JobApplicationForm;