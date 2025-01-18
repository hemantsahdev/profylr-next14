"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
// import type { EducationFormValues } from "../types/form";

const validationSchema = Yup.object({
    postGraduate: Yup.object(
        {
            institution: Yup.string().min(2).max(999),
            degree: Yup.string().min(2).max(999) 
            yearOfCompletion : "",
            result: "",
        }  
    ) ,
    undergraduate: {
        institution: "",
        degree: "",  //(e.g., Bachelor of Science in Computer Science)
        yearOfCompletion: "",
        result: "",
    },
    higherSecondary: {
        institution: "",
        specialization: "",  //(e.g., Bachelor of Science in Computer Science)
        yearOfCompletion: "",
        result: "",
    },
    secondarySchool: {
        institution: "",
        yearOfCompletion: "",
        result: "",
    },
});

const initialValues = {

    postGraduate: {
        institution: "",
        degree: "",  //(e.g., Master's in Business Administration)
        yearOfCompletion : "",
        result: "",
    },
    undergraduate: {
        institution: "",
        degree: "",  //(e.g., Bachelor of Science in Computer Science)
        yearOfCompletion: "",
        result: "",
    },
    higherSecondary: {
        institution: "",
        specialization: "",  //(e.g.,Science, Medical)
        yearOfCompletion: "",
        result: "",
    },
    secondarySchool: {
        institution: "",
        yearOfCompletion: "",
        result: "",
    },
};

const Education = () => {
    return (
        <Card className="h-[30rem] w-full bg-white rounded-xl overflow-y-auto custom-scrollbar ">
            <CardContent className="pt-6" >
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                >
                    {({ errors, touched }) => (
                        <Form className="h-full space-y-6  ">
                            <div className="space-y-4" > 
                                <CardTitle>Undergraduate</CardTitle>
                                <CardContent className="grid gap-4 sm:grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="undergraduate.instituteName">Institute Name</Label>
                                        <Field
                                            as={Input}
                                            id="undergraduate.instituteName"
                                            name="undergraduate.instituteName"
                                            placeholder="Enter institute name"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="undergraduate.field">Field</Label>
                                        <Field
                                            as={Input}
                                            id="undergraduate.field"
                                            name="undergraduate.field"
                                            placeholder="Enter field of study"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="undergraduate.yearOfPassing">Year of Passing</Label>
                                        <Field
                                            as={Input}
                                            id="undergraduate.yearOfPassing"
                                            name="undergraduate.yearOfPassing"
                                            placeholder="YYYY"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="undergraduate.result">Result</Label>
                                        <Field
                                            as={Input}
                                            id="undergraduate.result"
                                            name="undergraduate.result"
                                            placeholder="Enter result"
                                        />
                                    </div>
                                </CardContent>
                            </div>
                            <div className="space-y-4" >
                                <CardTitle>Twelfth Grade</CardTitle>
                                <CardContent className="grid gap-4 sm:grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="twelfthGrade.instituteName">Institute Name</Label>
                                        <Field
                                            as={Input}
                                            id="twelfthGrade.instituteName"
                                            name="twelfthGrade.instituteName"
                                            placeholder="Enter institute name"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="twelfthGrade.field">Field</Label>
                                        <Field
                                            as={Input}
                                            id="twelfthGrade.field"
                                            name="twelfthGrade.field"
                                            placeholder="Enter field of study"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="twelfthGrade.yearOfPassing">Year of Passing</Label>
                                        <Field
                                            as={Input}
                                            id="twelfthGrade.yearOfPassing"
                                            name="twelfthGrade.yearOfPassing"
                                            placeholder="YYYY"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="twelfthGrade.result">Result</Label>
                                        <Field
                                            as={Input}
                                            id="twelfthGrade.result"
                                            name="twelfthGrade.result"
                                            placeholder="Enter result"
                                        />
                                    </div>
                                </CardContent>
                            </div>
                            <div className="space-y-4" >
                                <CardTitle>Tenth Grade</CardTitle>
                                <CardContent className="grid gap-4 sm:grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="tenthGrade.instituteName">Institute Name</Label>
                                        <Field
                                            as={Input}
                                            id="tenthGrade.instituteName"
                                            name="tenthGrade.instituteName"
                                            placeholder="Enter institute name"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="tenthGrade.yearOfPassing">Year of Passing</Label>
                                        <Field
                                            as={Input}
                                            id="tenthGrade.yearOfPassing"
                                            name="tenthGrade.yearOfPassing"
                                            placeholder="YYYY"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="tenthGrade.result">Result</Label>
                                        <Field
                                            as={Input}
                                            id="tenthGrade.result"
                                            name="tenthGrade.result"
                                            placeholder="Enter result"
                                        />
                                    </div>
                                </CardContent>
                            </div>
                            <div className="flex justify-end">
                                <Button type="submit" className="bg-themePurple hover:bg-purple-700">
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

export default Education;
