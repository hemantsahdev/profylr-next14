"use client";

import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TechnicalSkillForm } from "@/types/resume-details/technicalSkills.type";
import * as Yup from "yup";
import { categories, proficiencyLevels } from "@/assets/static/skills.static";


const initialValues = {
    name: "",
    proficiency: "",
    experience: "",
    category: ""
};

const validationSchema  = Yup.object({
    name:Yup.string().min(2).max(50),
    proficiency : Yup.string()
});


const TechnicalSkills = ()=> {

    const [skills, setSkills] = useState< TechnicalSkillForm[]>([]);

    const handleSubmit = (values: TechnicalSkillForm, { resetForm }: { resetForm: () => void }) => {
        setSkills([...skills, values]);
        resetForm();
    };

    const removeSkill = (index: number) => {
        setSkills(skills.filter((_, i) => i !== index));
    };

    return (
        <Card className="h-full w-full bg-white rounded-xl">
            <CardContent className="h-full pt-6">
           
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    {({ values, setFieldValue }) => (
                        <Form className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Skill Name</Label>
                                    <Field
                                        as={Input}
                                        id="name"
                                        name="name"
                                        placeholder="Enter skill name"
                                        className="w-full"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="proficiency">Proficiency Level</Label>
                                    <Select
                                        value={values.proficiency}
                                        onValueChange={(value) => setFieldValue("proficiency", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select proficiency" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {proficiencyLevels.map((level) => (
                                                <SelectItem key={level} value={level}>
                                                    {level}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="experience">Years of Experience</Label>
                                    <Field
                                        as={Input}
                                        id="experience"
                                        name="experience"
                                        placeholder="Enter years of experience"
                                        className="w-full"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Select
                                        value={values.category}
                                        onValueChange={(value) => setFieldValue("category", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category} value={category}>
                                                    {category}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <Button type="submit" className="w-full">
              Add Skill
                            </Button>
                        </Form>
                    )}
                </Formik>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Added Skills</h2>
                    <div className="grid gap-3 md:grid-cols-2">
                        {skills.map((skill, index) => (
                            <Card key={index} className="p-4 relative">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-2 top-2"
                                    onClick={() => removeSkill(index)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                                <div className="space-y-2">
                                    <div className="font-medium">{skill.name}</div>
                                    <div className="text-sm text-muted-foreground">
                                        <div>Proficiency: {skill.proficiency}</div>
                                        <div>Experience: {skill.experience} years</div>
                                        <div>Category: {skill.category}</div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
      
            </CardContent>
        </Card>
    );
};


export default TechnicalSkills;
