import { Label } from "@/components/ui/label";
import { Field } from "formik";

interface FormikComponentFieldProps<T> {
    id:string
    name:string
    placeholder:string
    component : React.ComponentType<T>
    label:string
    disabled ?: boolean
    dropdownOptions ?: string[]  //for SELECT dropdown
    onDropdownValueSelected ?: (value:string)=> void //for SELECT dropdown
    setFieldValueAutomaticallyOfSelect ?: boolean //for SELECT dropdown
    optionalField ?: boolean
    year ?:boolean  //for DATE_PICKER
    month ?:boolean //for DATE_PICKER
    day ?:boolean  //for DATE_PICKER
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