"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CertificationsForm } from "@/types/resume-details/certification.type";
import FormikDatePicker from "@/shared/calendar/FormikDatePicker";
import FormikSelect from "@/shared/formikComponents/FormikSelect";
import FormikComponentField from "@/shared/formikComponents/FormikComponentField";
import FormikInputField from "@/shared/formikComponents/FormikInputField";

const categoryOptions =  ["Cloud Computing", "Data Science", "Project Management", "Other"];

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

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required("Name of the certificate is required.")
        .min(3, "Certificate name must be at least 3 characters long.")
        .max(100, "Certificate name must not exceed 100 characters."),
    
    issuingOrganisation: Yup.string()
        .required("Issuing organisation name is required.")
        .min(3, "Organisation name must be at least 3 characters long.")
        .max(100, "Organisation name must not exceed 100 characters."),
    
    issueDate: Yup.date()
        .required("Issuing date is required.")
        .max(new Date(), "Issue date cannot be in the future."),
    
    expiryDate: Yup.date()
        .nullable() // Allow it to be optional
        .test("isExpiryAfterIssue","Expiry date must be after the issue date.", function(value) {
            const {issueDate} = this.parent;
            return !issueDate || !value || value > issueDate;
        }),
    
    credentials: Yup.object({
        id: Yup.string()
            .nullable()
            .max(50, "Credential ID must not exceed 50 characters."),
      
        url: Yup.string()
            .nullable()
            .url("Must be a valid URL.")
            .test(
                "either-id-or-url",
                "Either Credential ID or URL must be provided.",
                function (value) {
                    const { id } = this.parent;
                    return !!value || !!id;
                }
            ),
    }),
    
    category: Yup.string()
        .nullable()
        // .oneOf(
        //     ["Cloud Computing", "Data Science", "Project Management", "Other"],
        //     "Invalid category selected."
        // ),
});
  

const Certifications= () => {
    return (
        <Card className="h-full w-full bg-white rounded-xl">
            <CardContent className="pt-6" >
                <Formik<CertificationsForm>
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
                                    <div className="grid gap-6">

                                        <div className="grid grid-cols-3 gap-6">
                                            {/* name */}
                                            <div className="">
                                                <Label htmlFor="name">Certification Name</Label>
                                                <Field
                                                    as={Input}
                                                    id="name"
                                                    name="name"
                                                    placeholder="Eg: Certified Kubernetes Administrator (CKA)"
                                                />
                                                {errors.name && touched.name && (
                                                    <p className="text-sm text-red-500 mt-1">
                                                        {errors.name as string}
                                                    </p>
                                                )}
                                            </div>
                                            {/* issuing date */}
                                            <div >
                                                <FormikComponentField
                                                    id="issueDate"
                                                    name="issueDate"
                                                    placeholder=" Select issuing date "
                                                    component={FormikDatePicker}
                                                    label="Issue Date"
                                                    year={true} month={true} day={true}
                                                    optionalField= {false}
                                                />
                                              
                                            </div>
                                            {/* expiry date */}
                                            <div >
                                                <FormikComponentField
                                                    id="expiryDate"
                                                    name="expiryDate"
                                                    placeholder=" Select Expiry date "
                                                    component={FormikDatePicker}
                                                    label="Expiry Date"
                                                    year={true} month={true} day={true}
                                                    optionalField= {true}
                                                />
                                                
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-6" >
                                            {/* issuing organisation */}
                                            <div className="">
                                                <Label htmlFor="issuingOrganisation">Issuing Organisation</Label>
                                                <Field
                                                    as={Input}
                                                    id="issuingOrganisation"
                                                    name="issuingOrganisation"
                                                    placeholder="Enter Issuing Organisation Name"
                                                />
                                                {errors.issuingOrganisation && touched.issuingOrganisation && (
                                                    <p className="text-sm text-red-500 mt-1">
                                                        {errors.issuingOrganisation as string}
                                                    </p>
                                                )}
                                            </div>
                                            {/* category */}
                                            <div className="">
                                                <FormikComponentField 
                                                    id="category"
                                                    name="category"
                                                    placeholder=" Select category of certficate"
                                                    component={FormikSelect}
                                                    label="Category"
                                                    dropdownOptions= {categoryOptions}
                                                    optionalField= {true}
                                                />
                                                {errors.category && touched.category && (
                                                    <p className="text-sm text-red-500 mt-1">
                                                        {errors.category as string}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-8">
                                            <div>
                                                <FormikInputField
                                                    id="credentials.id"
                                                    name="credentials.id"
                                                    placeholder = "Enter Credentials Id"
                                                    label="Credential ID"
                                                    optional={true}
                                                />
                                            </div>
                                            <div>
                                                <FormikInputField
                                                    id="credentials.url"
                                                    name="credentials.url"
                                                    placeholder = "Enter Credentials url"
                                                    label="Credential URL"
                                                    optional= {true}
                                                />
                                            </div>
                                        </div>
                                    
                                        <Button
                                            type="button"
                                       
                                            className="w-full"
                                        >
                    Add Certificate
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