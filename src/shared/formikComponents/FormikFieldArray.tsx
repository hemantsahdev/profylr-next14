import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldArray, FieldArrayRenderProps, FieldProps, FormikProps } from "formik";
import React, { useCallback } from "react";
import FormikSelect from "./FormikSelect";
import FormikComponentField from "./FormikComponentField";

interface FormikFieldArrayProps<T> {
    involvedKey : keyof T,
    placeholder : string,
    showTextField : boolean,
    showSelect : boolean,
    dropdownOptions ?: string[],
}

const FormikFieldArray = <T,>({involvedKey,placeholder, showTextField = true , showSelect = false , dropdownOptions }:FormikFieldArrayProps<T>) => {

    // Stable callback to handle dropdown selection
    const onDropdownValueSelected = useCallback(
        (push: (value:string)=>void, selectedValue: string) => {
            console.log("onDropdownValueSelected called", selectedValue);

            // Prevent pushing empty values
            if (selectedValue && selectedValue.trim() !== "" ) {
                console.log("Pushing value:", selectedValue);
                push(selectedValue);
            } else {
                console.log("Not pushing empty or duplicate value.");
            }
        },
        [involvedKey] // Depend on involvedKey if it's dynamic
    );

    return (
        <FieldArray name={String(involvedKey)} >
            {({push,remove,form}:FieldArrayRenderProps)=>(
                <div className="space-y-2" >
                    {showTextField && (
                        <>
                            {form.values[involvedKey].map((item: string, idx: number) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <Field
                                        as={Input}
                                        name={`${String(involvedKey)}[${idx}]`} // Corrected name binding
                                        placeholder={placeholder}
                                    />

                                    {idx > 0 ? (
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => remove(idx)}
                                        >
            Remove
                                        </Button>
                                    ) : (
                                        <Button
                                            size="sm"
                                            className="h-7 bg-themePurple"
                                            onClick={() => push("")}
                                        >
            Add New
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </>
                    )}

                    {showSelect && dropdownOptions && (
                        <>
                            {form.values[involvedKey].map((item: string, idx: number) => {
                                console.log(item);
                                return(
                                    <div key={idx}>
                                        <div className="h-8 w-32 bg-red-500">{item}</div>
                                    </div>
                                );})}
                            <FormikComponentField
                                id={String(involvedKey)}
                                name={String(involvedKey)}
                                label={String(involvedKey)}
                                placeholder={placeholder}
                                component={FormikSelect}
                                dropdownOptions={dropdownOptions}
                                // onDropdownValueSelected={(selectedValue) => {
                                //     console.log("onDropdownValueSelected triggered for:", selectedValue);
                                //     onDropdownValueSelected(push, selectedValue);
                                // }} // Using stable function
                                onDropdownValueSelected={()=>push("Hello buddy")}
                                setFieldValueAutomaticallyOfSelect={false}
                            />
                        </>
                    )}

                                               
                </div>
                                      
            )}
        </FieldArray>
    );
};

export default FormikFieldArray;