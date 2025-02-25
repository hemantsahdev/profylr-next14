import { Select ,SelectContent,SelectTrigger,SelectValue,SelectItem} from "@/components/ui/select";
import { FieldProps, FormikProps } from "formik";
import React from "react";

interface FormikSelectProps <T> {
    field: FieldProps["field"],
    form : FormikProps<T>,
    dropdownOptions: string[];          // Options for the select dropdown
    placeholder: string;        // Placeholder text
    disabled ?: boolean;
    onDropdownValueSelected ?: (value:string)=> void //for SELECT dropdown
    setFieldValueAutomaticallyOfSelect ?: boolean //for SELECT dropdown
}

const FormikSelect = <T,>({ field, form, dropdownOptions, placeholder , disabled = false , setFieldValueAutomaticallyOfSelect = true , onDropdownValueSelected }:FormikSelectProps<T>) => {
    return (
        <Select
            value={field.value} // Connect the field's value
            onValueChange={(value) => setFieldValueAutomaticallyOfSelect ? form.setFieldValue(field.name, value) : onDropdownValueSelected ? onDropdownValueSelected(value) : form.setFieldValue(field.name,value) } // Update Formik state
            disabled={disabled}
        >
            <SelectTrigger id={field.name}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {dropdownOptions.map((option: string) => (
                    <SelectItem key={option} value={option}>
                        {option}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
  

export default FormikSelect;