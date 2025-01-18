"use client";

import { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectCard } from "./ProjectCard";

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Project name is required"),
    technologies: Yup.string().required("Technologies are required"),
    from: Yup.date().required("Start date is required"),
    to: Yup.date().required("End date is required"),
    description: Yup.array()
        .of(Yup.string())
        .min(1, "At least one description point is required"),
});

export function Projects() {
    const [projects, setProjects] = useState([]);

    return (
        <Card className="h-full w-full bg-white rounded-xl">
            <CardContent className="h-full pt-6">
                
                <Formik
                    initialValues={{
                        name: "",
                        technologies: "",
                        from: new Date(),
                        to: new Date(),
                        description: [""],
                        repository: "",
                        liveLink: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { resetForm }) => {
                        setProjects([...projects, values]);
                        resetForm();
                    }}
                >
                    {({ values, setFieldValue, errors, touched }) => (
                        <Form className="space-y-4">
                            <div>
                                <Field
                                    as={Input}
                                    name="name"
                                    placeholder="Enter project name"
                                    className={cn(
                                        errors.name && touched.name && "border-red-500"
                                    )}
                                />
                                {errors.name && touched.name && (
                                    <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                                )}
                            </div>

                            <div>
                                <Field
                                    as={Input}
                                    name="technologies"
                                    placeholder="Enter technologies used"
                                    className={cn(
                                        errors.technologies && touched.technologies && "border-red-500"
                                    )}
                                />
                                {errors.technologies && touched.technologies && (
                                    <p className="text-sm text-red-500 mt-1">{errors.technologies}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Popover>
                                        <PopoverTrigger asChild={true}>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "w-full justify-start text-left font-normal",
                                                    !values.from && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {values.from ? (
                                                    format(values.from, "PPP")
                                                ) : (
                                                    <span>From date</span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={values.from}
                                                onSelect={(date) => setFieldValue("from", date)}
                                                initialFocus={true}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                <div>
                                    <Popover>
                                        <PopoverTrigger asChild={true}>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "w-full justify-start text-left font-normal",
                                                    !values.to && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {values.to ? (
                                                    format(values.to, "PPP")
                                                ) : (
                                                    <span>To date</span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={values.to}
                                                onSelect={(date) => setFieldValue("to", date)}
                                                initialFocus={true}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>

                            <div>
                                <FieldArray name="description">
                                    {({ push, remove }) => (
                                        <div className="space-y-2">
                                            {values.description.map((point: string, index: number) => (
                                                <div key={index} className="flex gap-2">
                                                    <Field
                                                        as={Input}
                                                        name={`description.${index}`}
                                                        placeholder="Enter description point"
                                                        className="flex-1"
                                                    />
                                                    {index > 0 && (
                                                        <Button
                                                            type="button"
                                                            variant="destructive"
                                                            onClick={() => remove(index)}
                                                        >
                            Remove
                                                        </Button>
                                                    )}
                                                </div>
                                            ))}
                                            <Button
                                                type="button"
                                                variant="secondary"
                                                onClick={() => push("")}
                                            >
                      Add Description
                                            </Button>
                                        </div>
                                    )}
                                </FieldArray>
                                {errors.description && touched.description && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.description as string}
                                    </p>
                                )}
                            </div>

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
                            </div>

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
}

