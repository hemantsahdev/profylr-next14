import { Label } from "@/components/ui/label";
import { Field } from "formik";

interface FormikComponentFieldProps<T> {
    id:string
    name:string
    placeholder:string
    component : React.ComponentType<T>
    disabled : boolean
    label:string
}

const FormikComponentField = <T,>({id,name,placeholder,component,disabled,label,...props}:FormikComponentFieldProps<T>)=>{

    return (
        <>
            <Label htmlFor={id}> {label} </Label>
            <Field
                component = {component}
                id = {id}
                name = {name}
                disabled = {disabled}
                placeholder = {placeholder}
                {...props}
            />
        </>
    );
};

export default FormikComponentField;