import { Select ,SelectContent,SelectTrigger,SelectValue,SelectItem} from "@/components/ui/select";
import { FieldProps, FormikProps } from "formik";
import React from "react";

interface FormikSelectProps <T> {
    field: FieldProps["field"],
    form : FormikProps<T>,
    options: string[];          // Options for the select dropdown
    placeholder: string;        // Placeholder text
    disabled? : boolean
}

const FormikSelect = <T,>({ field, form, options, placeholder , disabled = false }:FormikSelectProps<T>) => {
    return (
        <Select
            value={field.value} // Connect the field's value
            onValueChange={(value) => form.setFieldValue(field.name, value)} // Update Formik state
            disabled={disabled}
        >
            <SelectTrigger id={field.name}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {options.map((option: string) => (
                    <SelectItem key={option} value={option}>
                        {option}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
  

export default FormikSelect;