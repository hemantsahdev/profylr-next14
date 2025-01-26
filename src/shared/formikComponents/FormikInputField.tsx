import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field } from "formik";
import React from "react";

interface FormikInputFieldProps {
    id : string
    name : string
    placeholder : string
    disabled ?: boolean
    optional ?: boolean
    label : string
}

const FormikInputField = ({id,name,placeholder,disabled=false,label , optional = false}:FormikInputFieldProps)=>{
    
    return (
        <>
            <Label htmlFor={id}>{label} <span className="text-xs text-muted-foreground" >Optional</span> </Label>
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