"use client";

import { SummaryForm } from "@/types/resume-details/summary.type";
import { Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


const validationSchema = Yup.object().shape({
    summary:Yup.string().required("Summary is mandatory resume section selected by you.").min(12,"summary is too short").max(100,"Summary is too long to fit in your resume.")
});

const initialValues : SummaryForm = {
    summary:""
};
const Summary = () => {
    
    const submitHandler = (values:SummaryForm)=>{

    };

    return (
        <Card className="h-full w-full bg-white rounded-xl">
            <CardContent className="h-full pt-6">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values)=> submitHandler(values)}
                >
                    {({touched,errors})=>(
                        <Form className="h-full" >
                            <div className="h-[80%] p-10  space-y-2" >
                                <Label htmlFor="summary" >Summary</Label>
                                <Field
                                    name="summary"
                                    id="summary"
                                    as={Textarea}
                                    placeholder="Enter your summary"
                                    style={{ resize: "none" }} // Prevent resizing
                                    className={`p-2 focus:border-themePurple tracking-wide ${
                                        touched.summary && errors.summary
                                            ? "border-red-500"
                                            : ""
                                    }`}
                                    rows={12}
                                />
                                {touched.summary && errors.summary && (
                                    <p className="text-sm text-red-500">{errors.summary}</p>
                                )}
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

export default Summary;