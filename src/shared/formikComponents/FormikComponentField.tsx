import { Label } from "@/components/ui/label";
import { Field } from "formik";

interface FormikComponentFieldProps<T> {
    id:string
    name:string
    placeholder:string
    component : React.ComponentType<T>
    label:string
    disabled ?: boolean
    dropdownOptions ?: string[]  //for select dropdown
    optionalField ?: boolean
    year ?:boolean  //for date picker
    month ?:boolean //for date picker
    day ?:boolean  //for date picker
}

const FormikComponentField = <T,>({id,name,placeholder,component,disabled=false,label,optionalField = false ,...props}:FormikComponentFieldProps<T>)=>{

    return (
        <>
            <Label htmlFor={id}> {label} {optionalField && <span className="text-xs text-muted-foreground" >Optional</span>} </Label>
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