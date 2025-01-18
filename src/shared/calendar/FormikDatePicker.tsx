"use client";

import { FieldProps, FormikProps } from "formik";
import React from "react";
import FlexibleDatePicker from "./FlexibleDatePicker";

interface FormikDatePickerProps<T>{
    field: FieldProps["field"]
    form : FormikProps<T>
    day ?: boolean
    month ?: boolean
    year? : boolean
}


const FormikDatePicker = <T,>({field,form,day,month,year}:FormikDatePickerProps<T>) => {

    const handleOnChange = (selectedYearDate:Date | null):void=>{
        const year = selectedYearDate?.getFullYear();
        console.log(year);
        if(year){
            form.setFieldValue(field.name,year);
        }
    };

    return (
        <FlexibleDatePicker day={day} month={month} year={year} onChange={handleOnChange} />
    );
};

export default FormikDatePicker;