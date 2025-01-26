"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { WorkExperienceForm } from "@/types/resume-details/workExperience.type";
import FromToDatePicker from "@/shared/calendar/FromToDatePicker";
import FormikFieldArray from "@/shared/formikComponents/FormikFieldArray";
import { CertificationsForm } from "@/types/resume-details/certification.type";

const initialValues : CertificationsForm = {
    name:"",
    issuingOrganisation : "",
    issueDate : "",
    expiryDate : "",
    credentials : {
        id:"",
        url: ""
    },
    category : ""
};


const Certifications= () => {
    return (
        <Card className="h-full w-full bg-white rounded-xl">
            <CardContent className="pt-6" >
                <Formik<WorkExperienceForm>
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                >
                    {({ values, errors, touched,setFieldValue }) => (
                        <Form className="space-y-6">
                            <div className="space-y-6">
                                <CardContent className="pt-6">
                                    <div className="grid gap-4">

                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="grid gap-2">
                                                <Label htmlFor="title">Job Title</Label>
                                                <Field
                                                    as={Input}
                                                    id="title"
                                                    name="title"
                                                    placeholder="Eg: Software Engineer or Marketing Specialist."
                                                />
                                                {errors.title && touched.title && (
                                                    <p className="text-sm text-red-500 mt-1">
                                                        {errors.title as string}
                                                    </p>
                                                )}
                                            </div>
                                            <div >
                                                <Label htmlFor="employmentDates" >Employment Dates</Label>
                                                <FromToDatePicker<WorkExperienceForm> values={values} setFieldValue={setFieldValue} involvedKey="employmentDates"  />
                                                {errors.employmentDates && touched.employmentDates && (
                                                    <p className="text-sm text-red-500 mt-1">
                                                        {errors.employmentDates as string}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-6" >
                                            <div className="">
                                                <Label htmlFor="companyName">Company Name</Label>
                                                <Field
                                                    as={Input}
                                                    id="companyName"
                                                    name="companyName"
                                                    placeholder="Enter Company Name"
                                                />
                                                {errors.companyName && touched.companyName && (
                                                    <p className="text-sm text-red-500 mt-1">
                                                        {errors.companyName as string}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="">
                                                <Label htmlFor="location">Location <span className="text-muted-foreground txt-xs" >Optional</span> </Label>
                                                <Field
                                                    as={Input}
                                                    id="companyName"
                                                    name="companyName"
                                                    placeholder="Enter Company Name"
                                                />
                                                {errors.location && touched.location && (
                                                    <p className="text-sm text-red-500 mt-1">
                                                        {errors.location as string}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-6" >
                                            <div>
                                                <Label htmlFor="responsibilities" >Key Responsibilities</Label>
                                                <FormikFieldArray involvedKey={"responsibilities"} placeholder="Enter responsibility" />
                                                {errors.responsibilities && touched.responsibilities && (
                                                    <p className="text-sm text-red-500 mt-1">
                                                        {errors.responsibilities as string}
                                                    </p>
                                                )}
                                            </div>
                                            <div>
                                                <Label htmlFor="achievements" >Key Achievements</Label>
                                                <FormikFieldArray involvedKey={"achievements"} placeholder="Enter Achievements" />
                                                {errors.achievements && touched.achievements && (
                                                    <p className="text-sm text-red-500 mt-1">
                                                        {errors.achievements as string}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    
                                        <Button
                                            type="button"
                                       
                                            className="w-full"
                                        >
                    Add Experience
                                        </Button>
                                    </div>
                                </CardContent>
                            </div>
                        </Form>
                    )}
                </Formik>
            </CardContent>

        </Card>
    );
};

export default Certifications;