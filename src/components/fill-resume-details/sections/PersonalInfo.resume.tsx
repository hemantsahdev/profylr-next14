"use client";

import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { PersonalInfoForm } from "@/types/resume-details/personaInfo.type";


const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    githubLink: Yup.string().url("Must be a valid URL"),
    linkedinLink: Yup.string().url("Must be a valid URL"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    contactNumber: Yup.string().required("Contact number is required"),
});

const  initialValues :PersonalInfoForm = {
    firstName: "",
    lastName: "",
    github: "",
    linkedin: "",
    email: "",
    contactNumber: "",
};



const PersonalInfo= () => {
   
    const submitHandler = (values:PersonalInfoForm):void=>{
        console.log(values);
    };

    return (
        <Card className="h-full w-full bg-white rounded-xl">
            <CardContent className="h-full pt-6">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values)=>submitHandler(values)}
                >
                    {({errors,touched})=>(
                        <Form className="h-full space-y-8" >
                            <div className="h-[80%] p-10 grid grid-cols-1 md:grid-cols-2 gap-6  " >
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        placeholder="Enter your first name"
                                        className={
                                            touched.firstName && errors.firstName
                                                ? "border-red-500"
                                                : ""
                                        }
                                    />
                                    {touched.firstName && errors.firstName && (
                                        <p className="text-sm text-red-500">{errors.firstName}</p>
                                    )}
                                </div>
    
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        placeholder="Enter your last name"
                                        className={
                                            touched.lastName && errors.lastName
                                                ? "border-red-500"
                                                : ""
                                        }
                                    />
                                    {touched.lastName && errors.lastName && (
                                        <p className="text-sm text-red-500">{errors.lastName}</p>
                                    )}
                                </div>
    
                                <div className="space-y-2">
                                    <Label htmlFor="githubLink">GitHub Link</Label>
                                    <Input
                                        id="githubLink"
                                        name="githubLink"
                                        placeholder="https://github.com/username"
                                        className={
                                            touched.github && errors.github
                                                ? "border-red-500"
                                                : ""
                                        }
                                    />
                                    {touched.github && errors.github && (
                                        <p className="text-sm text-red-500">{errors.github}</p>
                                    )}
                                </div>
    
                                <div className="space-y-2">
                                    <Label htmlFor="linkedinLink">LinkedIn Link</Label>
                                    <Input
                                        id="linkedinLink"
                                        name="linkedinLink"
                                        placeholder="https://linkedin.com/in/username"
                                        className={
                                            touched.linkedin && errors.linkedin
                                                ? "border-red-500"
                                                : ""
                                        }
                                    />
                                    {touched.linkedin && errors.linkedin && (
                                        <p className="text-sm text-red-500">{errors.linkedin}</p>
                                    )}
                                </div>
    
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="your.email@example.com"
                                        className={
                                            touched.email && errors.email
                                                ? "border-red-500"
                                                : ""
                                        }
                                    />
                                    {touched.email && errors.email && (
                                        <p className="text-sm text-red-500">{errors.email}</p>
                                    )}
                                </div>
    
                                <div className="space-y-2">
                                    <Label htmlFor="contactNumber">Contact Number</Label>
                                    <Input
                                        id="contactNumber"
                                        name="contactNumber"
                                        placeholder="+1 (123) 456-7890"
                                        className={
                                            touched.contactNumber && errors.contactNumber
                                                ? "border-red-500"
                                                : ""
                                        }
                                    />
                                    {touched.contactNumber && errors.contactNumber && (
                                        <p className="text-sm text-red-500">{errors.contactNumber}</p>
                                    )}
                                </div>
                            </div>
    
                            <div className="h-[20%] flex justify-end">
                                <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                    Save
                                </Button>
                            </div>
                        </Form>
                    )}

                </Formik>
                   
            </CardContent>
        </Card>
    );
};

export default PersonalInfo;





