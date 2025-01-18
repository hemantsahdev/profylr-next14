"use client";

import { Formik, Form, Field, FieldArray } from "formik";
import * as yup from "yup";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash2 } from "lucide-react";
// import type { ExperienceFormValues, Experience } from "../types/form";

const validationSchema = yup.object({
    experiences: yup.array().of(
        yup.object({
            organizationName: yup.string().required("Required"),
            position: yup.string().required("Required"),
            from: yup.string().required("Required"),
            to: yup.string().required("Required"),
            description: yup.string().required("Required"),
        })
    ),
});

const initialValues = {
    experiences: [],
};

// const emptyExperience: Omit<Experience, "id"> = {
//     organizationName: "",
//     position: "",
//     from: "",
//     to: "",
//     description: "",
// };

const emptyExperience = {
    organizationName: "",
    position: "",
    from: "",
    to: "",
    description: "",
};

const WorkExperiences = ()=> {
    return (
        <Card className="h-full w-full bg-white rounded-xl">
            <CardContent className="pt-6" >
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                >
                    {({ values, errors, touched }) => (
                        <Form className="space-y-6">
                            <FieldArray name="experiences">
                                {({ push, remove }) => (
                                    <div className="space-y-6">
                                        <CardContent className="pt-6">
                                            <div className="grid gap-4">
                                                <div className="grid gap-2">
                                                    <Label htmlFor="organizationName">Organization Name</Label>
                                                    <Field
                                                        as={Input}
                                                        id="organizationName"
                                                        name="organizationName"
                                                        placeholder="Enter organization name"
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="position">Position</Label>
                                                    <Field
                                                        as={Input}
                                                        id="position"
                                                        name="position"
                                                        placeholder="Enter position"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="from">From</Label>
                                                        <Field
                                                            as={Input}
                                                            id="from"
                                                            name="from"
                                                            placeholder="YYYY-MM"
                                                        />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="to">To</Label>
                                                        <Field
                                                            as={Input}
                                                            id="to"
                                                            name="to"
                                                            placeholder="YYYY-MM"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="description">Description</Label>
                                                    <Field
                                                        as={Textarea}
                                                        id="description"
                                                        name="description"
                                                        placeholder="Enter description"
                                                    />
                                                </div>
                                                <Button
                                                    type="button"
                                                    onClick={() => {
                                                        push({
                                                            id: Date.now().toString(),
                                                            ...emptyExperience,
                                                        });
                                                    }}
                                                    className="w-full"
                                                >
                        Add Experience
                                                </Button>
                                            </div>
                                        </CardContent>

                                        {values.experiences.length > 0 && (
                                            <Card>
                                                <CardContent className="pt-6">
                                                    <div className="space-y-4">
                                                        <h3 className="font-semibold">Added Experiences</h3>
                                                        {values.experiences.map((experience, index) => (
                                                            <div
                                                                key={experience.id}
                                                                className="flex items-center justify-between rounded-lg border p-4"
                                                            >
                                                                <div>
                                                                    <h4 className="font-medium">{experience.organizationName}</h4>
                                                                    <p className="text-sm text-muted-foreground">
                                                                        {experience.position}
                                                                    </p>
                                                                </div>
                                                                <div className="flex gap-2">
                                                                    <Button
                                                                        type="button"
                                                                        variant="outline"
                                                                        size="icon"
                                                                        onClick={() => {
                                                                            // Implement edit functionality
                                                                        }}
                                                                    >
                                                                        <Pencil className="h-4 w-4" />
                                                                    </Button>
                                                                    <Button
                                                                        type="button"
                                                                        variant="outline"
                                                                        size="icon"
                                                                        onClick={() => remove(index)}
                                                                    >
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        )}
                                    </div>
                                )}
                            </FieldArray>
                        </Form>
                    )}
                </Formik>
            </CardContent>

        </Card>

    );
};

export default WorkExperiences;
