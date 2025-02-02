"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import FormikComponentField from "@/shared/formikComponents/FormikComponentField";
import FormikFieldArray from "@/shared/formikComponents/FormikFieldArray";
import FormikInputField from "@/shared/formikComponents/FormikInputField";
import FormikSelect from "@/shared/formikComponents/FormikSelect";
import { ResumeSectionForm } from "@/types/admin/resume-section.type";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

const CATEGORIES = ["Engineering"];
const DEPARTMENTS = ["CSE "," ECE" , "EE "];

const initialValues : ResumeSectionForm= {
    sectionName:"",
    description : "",
    categories : [],
    departments : []
};

const validationSchema = Yup.object().shape({
    sectionName: Yup.string().required("Name of the section is required"),
    description: Yup.string()
        .max(500, "Description can't exceed 500 characters")
        .nullable(),
    categories: Yup.array()
        .of(Yup.string().required("Each category must be a string"))
        .min(1, "At least one category is required"),
    departments: Yup.array()
        .of(Yup.string().required("Each department must be a string"))
        .min(1, "At least one department is required"),
});
  

const CreateResumeSection = () => {

    return (
        <div className="w-[90%] h-[90%] p-4 rounded-xl shadow-lg bg-white border border-gray-200 " >
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                {({ values, errors, touched }) => {
                    console.log(values);

                    return (
                        <Form className="h-full w-full flex flex-col justify-between">
                            <div className="space-y-4" >
                                {/* section name */}
                                <div>
                                    <FormikInputField
                                        id="name"
                                        name="name"
                                        label="Section Name"
                                        placeholder="Enter section name"
                                    />
                                </div>

                                {/* description */}
                                <div>
                                    <FormikInputField
                                        id="description"
                                        name="description"
                                        label="Description"
                                        placeholder="Enter description"
                                    />
                                </div>
      
                                {/* select categories */}
                                <div className="flex">
                           
                                    {/* causing ERROR */}
                                    <FormikFieldArray
                                        involvedKey={"categories"}
                                        placeholder="Select categories"
                                        dropdownOptions={CATEGORIES}
                                        showTextField = {false}
                                        showSelect = {true}
                                    />
                                </div>
      
                                {/* select departments */}
                                <div>
                                    <FormikComponentField
                                        id="departments"
                                        name="departments"
                                        component={FormikSelect}
                                        placeholder="Select departments"
                                        label="Departments"
                                        dropdownOptions={["HR", "Finance", "Operations"]}
                                    />
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {Array.isArray(values.departments) &&
                      values.departments.length > 0 &&
                      values.departments.map((department, idx) => (
                          <Badge key={idx} className="bg-green-600 text-white">
                              {department}
                          </Badge>
                      ))}
                                    </div>
                                </div>
                            </div>
      
                            <Button type="submit" className="w-full">
                  Create
                            </Button>
                        </Form>
                    );
                }
            
                }
            </Formik>
        </div>

    );
};

export default CreateResumeSection;