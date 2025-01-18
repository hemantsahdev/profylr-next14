"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { EducationForm } from "@/types/resume-details/education.type";
import FormikSelect from "@/shared/select/FormikSelect";
import FormikDatePicker from "@/shared/calendar/FormikDatePicker";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";


const validationSchema = Yup.object({
    postGraduate: Yup.object({
        institution: Yup.string().min(2).max(999),
        degree: Yup.string().min(2).max(999) ,
        yearOfCompletion : Yup.string(),
        result: Yup.string(),
    }),
    underGraduate: Yup.object({
        institution: Yup.string().min(2).max(999),
        degree: Yup.string().min(2).max(999) ,
        yearOfCompletion : Yup.string(),
        result: Yup.string(),
    }),
    higherSecondary: Yup.object({
        institution: Yup.string().min(2).max(999),
        specialization: Yup.string().min(2).max(999) ,
        yearOfCompletion : Yup.string(),
        result: Yup.string(),
    }),
    secondarySchool: Yup.object({
        institution: Yup.string().min(2).max(999),
        yearOfCompletion : Yup.string(),
        result: Yup.string(),
    }),
});

const initialValues : EducationForm = {
    postGraduate: {
        institution: "",
        degree: "",  //(e.g., Master's in Business Administration)
        yearOfCompletion : "",
        result: "",
    },
    underGraduate: {
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

interface SelectedSectionsType {
    postGraduate:boolean
    underGraduate:boolean
    higherSecondary:boolean
    secondarySchool:boolean
}

const Education = () => {

    const [selectedSections,setSelectedSections] = useState<SelectedSectionsType>({
        postGraduate:true,
        underGraduate:true,
        higherSecondary:false,
        secondarySchool:false
    });

    const submitHandler = (values:EducationForm)=>{
        console.log(values);
    };

    const handleCheckedChange = (sectionName: keyof SelectedSectionsType)=>{

        setSelectedSections((prev)=>({
            ...prev,
            [sectionName]: !prev[sectionName]
        }));
    };

    return (
        <Card className="h-[30rem] w-full bg-white rounded-xl overflow-y-auto custom-scrollbar ">
            <CardContent className="pt-6" >
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => submitHandler(values)}
                >
                    {({ errors, touched }) => (
                        <Form className="h-full   ">

                            {/* postGraduate */}
                            <div className="space-y-4" > 
                                <CardTitle> 
                                    <div className="flex items-center  gap-8 ">
                                        <p> Post Graduate  </p>
                                        <Switch  checked={selectedSections.postGraduate} onCheckedChange={()=> handleCheckedChange("postGraduate") }  />
                                    </div> 
                                    
                                </CardTitle>
                                <CardContent className="grid gap-4 sm:grid-cols-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="postGraduate.institution">Institution Name</Label>
                                        <Field
                                            as={Input}
                                            id="postGraduate.institution"
                                            name="postGraduate.institution"
                                            placeholder="Enter institution name"
                                            disabled={!selectedSections.postGraduate}

                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="postGraduate.degree">Degree</Label>
                                        <Field
                                            component={FormikSelect}
                                            id="postGraduate.degree"
                                            options={["MSc", "MBA", "MA", "M.Tech"]}
                                            name="postGraduate.degree"
                                            placeholder="Select Degree"
                                            disabled={!selectedSections.postGraduate}

                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="postGraduate.yearOfCompletion">Year of Completion</Label>
                                        <Field
                                            component = {FormikDatePicker}
                                            year={true} month={false} day={false}
                                            id="postGraduate.yearOfCompletion"
                                            name="postGraduate.yearOfCompletion"
                                            disabled={!selectedSections.postGraduate}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="postGraduate.result">Result</Label>
                                        <Field
                                            as={Input}
                                            id="postGraduate.result"
                                            name="postGraduate.result"
                                            placeholder="Enter result"
                                            disabled={!selectedSections.postGraduate}
                                        />
                                    </div>
                                </CardContent>
                            </div>

                            {/* underGraduate */}
                            <div className="space-y-4" > 
                                <CardTitle className="flex items-center  gap-8 ">
                                    <p> Under Graduate  </p>
                                    <Switch checked={selectedSections.underGraduate} onCheckedChange={()=> handleCheckedChange("underGraduate") }  />
                                </CardTitle> 
                                <CardContent className="grid gap-4 sm:grid-cols-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="underGraduate.institution">Institution Name</Label>
                                        <Field
                                            as={Input}
                                            id="underGraduate.institution"
                                            name="underGraduate.institution"
                                            placeholder="Enter institute name"
                                            disabled={!selectedSections.underGraduate}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="underGraduate.degree">Degree</Label>
                                        <Field
                                            component={FormikSelect}
                                            options={["B.Tech","B.A","B.Sc"]}
                                            id="underGraduate.degree"
                                            name="underGraduate.degree"
                                            placeholder="Select Degree"
                                            disabled={!selectedSections.underGraduate}

                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="underGraduate.yearOfCompletion">Year of Completion</Label>
                                        <Field
                                            component = {FormikDatePicker}
                                            year={true} month={false} day={false}
                                            id="underGraduate.yearOfCompletion"
                                            name="underGraduate.yearOfCompletion"
                                            disabled={!selectedSections.underGraduate}

                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="underGraduate.result">Result</Label>
                                        <Field
                                            as={Input}
                                            id="underGraduate.result"
                                            name="underGraduate.result"
                                            placeholder="Enter result"
                                            disabled={!selectedSections.underGraduate}

                                        />
                                    </div>
                                </CardContent>
                            </div>

                            {/* higher secondary */}
                            <div className="space-y-4" >
                                <CardTitle className="flex items-center  gap-8 ">
                                    <p> Higher Secondary  </p>
                                    <Switch checked={selectedSections.higherSecondary} onCheckedChange={()=> handleCheckedChange("higherSecondary") }  />
                                </CardTitle>
                                <CardContent className="grid gap-4 sm:grid-cols-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="higherSecondary.institution">Institution Name</Label>
                                        <Field
                                            as={Input}
                                            id="higherSecondary.institution"
                                            name="higherSecondary.institution"
                                            placeholder="Enter institute name"
                                            disabled={!selectedSections.higherSecondary}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="higherSecondary.specialization">Specialization</Label>
                                        <Field
                                            component = {FormikSelect}
                                            options={["Non-Medical","Medical","Arts & Humaities","Commerce"]}
                                            id="higherSecondary.specialization"
                                            name="higherSecondary.specialization"
                                            placeholder="Select specialization"
                                            disabled={!selectedSections.higherSecondary}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="higherSecondary.yearOfCompletion">Year of Completion</Label>
                                        <Field
                                            component = {FormikDatePicker}
                                            year={true}
                                            month={false} 
                                            day={false}
                                            id="higherSecondary.yearOfCompletion"
                                            name="higherSecondary.yearOfCompletion"
                                            disabled={!selectedSections.higherSecondary}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="higherSecondary.result">Result</Label>
                                        <Field
                                            as={Input}
                                            id="higherSecondary.result"
                                            name="higherSecondary.result"
                                            placeholder="Enter result"
                                            disabled={!selectedSections.higherSecondary}
                                        />
                                    </div>
                                </CardContent>
                            </div>

                            {/* secondary  */}
                            <div className="space-y-4" >
                                <CardTitle className="flex items-center  gap-8 ">
                                    <p> Secondary School  </p>
                                    <Switch checked={selectedSections.secondarySchool} onCheckedChange={()=> handleCheckedChange("secondarySchool") }  />

                                </CardTitle>
                                <CardContent className="grid gap-4 sm:grid-cols-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="secondarySchool.institution">Institution Name</Label>
                                        <Field
                                            as={Input}
                                            id="secondarySchool.institution"
                                            name="secondarySchool.institution"
                                            placeholder="Enter institute name"
                                            disabled={!selectedSections.secondarySchool}

                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="secondarySchool.yearOfCompletion">Year of Passing</Label>
                                        <Field
                                            component = {FormikDatePicker}
                                            year={true} month={false} day={false}
                                            id="secondarySchool.yearOfCompletion"
                                            name="secondarySchool.yearOfCompletion"
                                            disabled={!selectedSections.secondarySchool}
                                        
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="secondarySchool.result">Result</Label>
                                        <Field
                                            as={Input}
                                            id="secondarySchool.result"
                                            name="secondarySchool.result"
                                            placeholder="Enter result"
                                            disabled={!selectedSections.secondarySchool}

                                        />
                                    </div>
                                </CardContent>
                            </div>

                            <div className="flex justify-end">
                                <Button
                                    type="submit" 
                                    className="bg-themePurple hover:bg-purple-700"
                                    size={"lg"}
                                >
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
