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
                    <Form className="space-y-4">
                        <div>

                            <FormikInputField
                                id="name"
                                name="name"
                                label="Section Name"
                                placeholder="Enter section name"
                            />
                        </div>

                        <div>
                            <FormikInputField
                                id="description"
                                name="description"
                                label="Description"
                                placeholder="Enter description"
                            />
                        </div>
      
                        <div className="flex">
                            <div className="w-[50%]" >
                                <FormikComponentField
                                    id="categories"
                                    name="categories"
                                    label="Categories"
                                    component={FormikSelect}
                                    placeholder="Select categories"
                                    dropdownOptions={CATEGORIES}
                                />
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {Array.isArray(values.categories) &&
                      values.categories.length > 0 && 
                      values.categories.map((category, idx) => (
                          <Badge key={idx} className="bg-indigo-600 text-white">
                              {category}
                          </Badge>
                      ))}
                            </div>
                        </div>
      
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
      
                        <Button type="submit" className="w-full">
                  Submit
                        </Button>
                    </Form>
                );
            }
            
            }
        </Formik>
    );
};

export default CreateResumeSection;