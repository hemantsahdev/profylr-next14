"use client";

import { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectForm } from "@/types/resume-details/project.type";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import FromToDatePicker from "@/shared/calendar/FromToDatePicker";
import FormikFieldArray from "@/shared/formikComponents/FormikFieldArray";
import { Description } from "@radix-ui/react-dialog";
import { ProjectCard } from "./ProjectCard";
  
  

const defaultLinkOptions = [{type:"github",value:""},{type:"live",value:""}];

const initialValues : ProjectForm = {
    title: "",
    description: [""],
    technologies: [],
    role : "",
    achievements :[""],
    duration:{
        from: new Date(),
        to: new Date(),
    },
    link : defaultLinkOptions
};

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .required("Project title is required.")
        .max(100, "Title should not exceed 100 characters."),
    description: Yup.array()
        .of(Yup.string())
        .min(1, "At least one description is required for the project.")
        .required("Description is required."),
    technologies: Yup.array()
        .of(Yup.string())
        .min(1, "Add at least one technology used in the project.")
        .required("Technologies are required."),
    role: Yup.string()
        .min(2, "Role should be at least 2 characters.")
        .max(50, "Role should not exceed 50 characters."),
    achievements: Yup.array()
        .of(Yup.string())
        .min(1, "Add at least one achievement to enhance your resume.")
        .max(4, "Too many achievements may clutter your resume."),
    duration: Yup.object({
        from: Yup.date().required("Start date is required."),
        to: Yup.date()
            .required("End date is required.")
            .test(
                "isToAfterFrom",
                "Completion date should be after the starting date.",
                function (value) {
                    const { from } = this.parent;
                    return !from || !value || from < value;
                }
            ),
    }),
    link: Yup.array()
        .of(
            Yup.object({
                type: Yup.string()
                    .required("Please specify the type of link, e.g., GitHub or Live Demo."),
                value: Yup.string()
                    .url("Provide a valid URL.")
                    .required("Link value is required."),
            })
        ),
});
  
const MAX_ACHIEVEMENTS = 3;

const Projects = ()=> {

    const [projects, setProjects] = useState([]);

    const handleAddNewAchievements = (push : (obj:string)=>void ,length:number)=>{
        if(MAX_ACHIEVEMENTS && length < MAX_ACHIEVEMENTS){
            push("");
        }else{
            alert("Too many achievements.");
        }
    };
    return (
        <Card className="h-full w-full bg-white rounded-xl">
            <CardContent className="h-full pt-6">

                <Formik<ProjectForm>
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, { resetForm }) => {
                        console.log(values);
                    }}
                >
                    {({ values, setFieldValue, errors, touched }) => (
                        <Form className="space-y-4">

                            {/* title , duration (start date , end date) */}
                            <div className=" w-full grid grid-cols-2 gap-8  " >

                                <div>
                                    <Label htmlFor="title" >Project Title</Label>
                                    <Field
                                        as={Input}
                                        name="title"
                                        placeholder="Enter project name"
                                        className={cn(
                                            errors.title && touched.title && "border-red-500"
                                        )}
                                    />
                                    {errors.title && touched.title && (
                                        <p className="text-sm text-red-500 mt-1">{errors.title}</p>
                                    )}
                                </div>

                                <div className=" items-center" >
                                    <Label>Duration</Label>
                                    <FromToDatePicker<ProjectForm> values={values} setFieldValue={setFieldValue} involvedKey="duration"  />
                                </div>
                            </div>
                          
                            <div className="grid grid-cols-2 gap-6" >

                                <div>
                                    <Label htmlFor="description" >Short Description</Label>
                                    <FormikFieldArray involvedKey={"description"} placeholder="Enter description" />
                                    {errors.description && touched.description && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.description as string}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="achievements" >Key Achievements </Label>
                                    <FormikFieldArray involvedKey={"achievements"} placeholder="Enter achievements" />
                                    {errors.achievements && touched.achievements && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.achievements as string}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6 " >

                                <div>
                                    <Label htmlFor="technologies" >Technologies Used</Label>
                                    <Field
                                        as={Input}
                                        name="technologies"
                                        placeholder="Your role in the project"
                                        className={cn(
                                            errors.technologies && touched.technologies && "border-red-500"
                                        )}
                                    />
                                    {errors.technologies && touched.technologies && (
                                        <p className="text-sm text-red-500 mt-1">{errors.technologies}</p>
                                    )}
                                </div>

                         
                                <div>
                                    <Label htmlFor="role" >Role</Label>
                                    <Field
                                        as={Input}
                                        name="role"
                                        placeholder="Your role in the project"
                                        className={cn(
                                            errors.role && touched.role && "border-red-500"
                                        )}
                                    />
                                    {errors.role && touched.role && (
                                        <p className="text-sm text-red-500 mt-1">{errors.role}</p>
                                    )}
                                </div>
                            </div>
                         
                            <div>
                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Add Links" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="create" className="bg-gray-700 text-white" >Create new</SelectItem>
                                        <SelectItem value="github">Github</SelectItem>
                                        <SelectItem value="live">Live</SelectItem>
                                    </SelectContent>
                                </Select>

                            </div>
                            {/* 
                            <div>
                                <Field
                                    as={Input}
                                    name="repository"
                                    placeholder="Repository URL (optional)"
                                />
                            </div>

                            <div>
                                <Field
                                    as={Input}
                                    name="liveLink"
                                    placeholder="Live link (optional)"
                                />
                            </div> */}

                            <Button type="submit" className="w-full">
              Add Project
                            </Button>
                        </Form>
                    )}
                </Formik>

                {projects.length > 0 && (
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-4">Added Projects</h2>
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={index}
                                project={project}
                                onEdit={() => {
                                // Implement edit functionality
                                }}
                                onDelete={() => {
                                    setProjects(projects.filter((_, i) => i !== index));
                                }}
                            />
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default Projects;
