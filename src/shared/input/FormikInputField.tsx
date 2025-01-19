import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field } from "formik";
import React from "react";

interface FormikInputFieldProps {
    id:string
    name:string
    placeholder:string
    disabled:boolean
    label:string
}

const FormikInputField = ({id,name,placeholder,disabled,label}:FormikInputFieldProps)=>{
    
    return (
        <>
            <Label htmlFor={id}>{label} </Label>
            <Field
                as={Input}
                id = {id}
                name = {name}
                placeholder = {placeholder}
                disabled = {disabled}
            />
        </>
    );
     
};

export default FormikInputField;