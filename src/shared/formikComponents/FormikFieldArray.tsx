import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldArray, FieldArrayRenderProps, FieldProps, FormikProps } from "formik";
import React from "react";
import FormikSelect from "./FormikSelect";
import FormikComponentField from "./FormikComponentField";

interface FormikFieldArrayProps<T> {
    involvedKey : keyof T,
    placeholder : string,
    showTextField : boolean,
    showSelect : boolean,
    dropdownOptions ?: string[],
   
}

const FormikFieldArray = <T,>({involvedKey,placeholder, showTextField = true , showSelect = false , dropdownOptions}:FormikFieldArrayProps<T>) => {

    return (
        <FieldArray name={String(involvedKey)} >
            {({push,remove,form}:FieldArrayRenderProps)=>(
                <div className="space-y-2" >
                    {form.values[involvedKey].map((_:string,idx:number)=>(
                        <>
                            {showTextField && (
                                <div key={idx} className="flex items-center gap-2" >
                                    <Field
                                        as={Input}
                                        name = {`${String(involvedKey)}-${idx}`}
                                        placeholder = {placeholder}
                                    />

                          
                                    {idx > 0 ? (
                                        <Button size={"sm"} variant={"ghost"} className="" onClick={()=>remove(idx)} >
                                                                Remove
                                        </Button>
                                    ) :(
                                        <Button size={"sm"} onClick={() => push("")}className="h-7 bg-themePurple ">Add New</Button>
                                    )}
                                                   
                                </div>
                            )}
                            {showSelect && dropdownOptions && (
                                <>
                                    {/* this wont work . i need to make a new select as the current select is setting the field rather than pusnhg in the array. */}
                                    {/* <FormikComponentField
                                        id={String(involvedKey)}
                                        name={String(involvedKey)}
                                        label={String(involvedKey)}
                                        placeholder={placeholder}
                                        component={FormikSelect}
                                        dropdownOptions={dropdownOptions}
                                    /> */}
                                </>
                            )}

                        </>

                    ))}
                                               
                </div>
                                      
            )}
        </FieldArray>
    );
};

export default FormikFieldArray;