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


const initialValues : WorkExperienceForm = {
    title: "",
    companyName : "",
    employmentDates : {
        from : "",
        to : ""
    },
    location : "",
    responsibilities : [""],
    achievements : [""]
};

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .min(2, "Title is too short.")
        .max(60, "Title too long.")
        .required("Title is required to register this as a work experience"),
    companyName: Yup.string()
        .min(2, "Company name is too short.")
        .max(100, "Company name too long.")
        .required("Company name is required."),
    employmentDates: Yup.object().shape({
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
    location: Yup.string()
        .min(2, "Location is too short.")
        .max(100, "Location too long."),
    responsibilities: Yup.array()
        .of(Yup.string().min(2, "Responsibility description is too short."))
        .required("At least one responsibility is required."),
    achievements: Yup.array()
        .of(Yup.string().min(2, "Achievement description is too short."))
        .required("At least one achievement is required."),
});
  

const WorkExperiences = ()=> {
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

export default WorkExperiences;
