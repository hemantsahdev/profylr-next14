"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FormikDatePicker from "@/shared/calendar/FormikDatePicker";
import FormikSelect from "@/shared/formikComponents/FormikSelect";
import FormikComponentField from "@/shared/formikComponents/FormikComponentField";
import FormikInputField from "@/shared/formikComponents/FormikInputField";
import { AchievementsAndAwardsForm } from "@/types/resume-details/achievementsAndAwards.type";

const categoryOptions = [
    "Academic",
    "Professional",
    "Technical",
    "Sports",
    "Community Service",
    "Leadership",
    "Creative Arts",
    "Entrepreneurship",
    "Research and Innovation",
    "Volunteer Work",
    "Cultural Activities",
    "Public Speaking",
    "Hackathons",
    "Certifications",
    "Scholarships",
];
  
const initialValues :AchievementsAndAwardsForm = {
    title : "",
    issuer : "",
    receivingDate : new Date(Date.now()),
    description : "" ,
    type : ""
};

const validationSchema = Yup.object().shape({
    title : Yup.string().required("Title for the achievement/award is required"),
    issuer :  Yup.string().required("Issuer name is required"),
    receivingDate : Yup.date().required("Month and year of receipt is required."),
    description : Yup.string().required("A brief description about achievement/award is required."),
    type: Yup.string().nullable()
});

const AchievementsAndAwards = () => {
    return (
        <Card className="h-full w-full bg-white rounded-xl">
            <CardContent className="pt-6" >
                <Formik<AchievementsAndAwardsForm>
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
                                                <FormikInputField
                                                    id="title"
                                                    name="title"
                                                    placeholder="Eg: Employee of the Month"
                                                    label="Title"
                                                />
                                               
                                                {errors.title && touched.title && (
                                                    <p className="text-sm text-red-500 mt-1">
                                                        {errors.title as string}
                                                    </p>
                                                )}
                                            </div>
                                            {/* receiving Date  */}
                                            <div >
                                                <FormikComponentField
                                                    id="receivingDate"
                                                    name="receivingDate"
                                                    placeholder=" Select receiving Date "
                                                    component={FormikDatePicker}
                                                    label="Receiving Date"
                                                    year={true} month={true} day={true}
                                                    optionalField= {false}
                                                />
                                          
                                            </div>
                                            {/* Category */}
                                            <div >
                                                <FormikComponentField
                                                    id="category"
                                                    name="category"
                                                    placeholder=" Select Category "
                                                    component={FormikSelect}
                                                    label="Category"
                                                    optionalField= {true}
                                                    dropdownOptions={categoryOptions}
                                                />
                                            
                                            </div>
                                        </div>
                                        <div className=" w-full flex items-center gap-6" >
                                            {/* issuer */}
                                            <div className="w-[30%]">
                                                <FormikInputField
                                                    name="issuer"
                                                    id="issuer"
                                                    placeholder="Eg: ABC Corporation/ National Science Foundation"
                                                    label="Issuer"
                                                />
                                               
                                                {errors.issuer && touched.issuer && (
                                                    <p className="text-sm text-red-500 mt-1">
                                                        {errors.issuer as string}
                                                    </p>
                                                )}
                                            </div>

                                            {/* description */}
                                            <div className="w-[70%]">
                                                <FormikInputField
                                                    name="description"
                                                    id="description"
                                                    placeholder="Eg: For outstanding performance in project delivery."
                                                    label="Description"
                                                />
                                               
                                                {errors.description && touched.description && (
                                                    <p className="text-sm text-red-500 mt-1">
                                                        {errors.description as string}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                       
                                        <Button
                                            type="button"
                                            className="w-full"
                                        >
                Add Achievement/Award
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

export default AchievementsAndAwards;