import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldArray, FieldArrayRenderProps } from "formik";
import React from "react";

interface FormikFieldArrayProps<T> {
    involvedKey : keyof T,
    placeholder : string,
}

const FormikFieldArray = <T,>({involvedKey,placeholder}:FormikFieldArrayProps<T>) => {

    return (
        <FieldArray name={String(involvedKey)} >
            {({push,remove,form}:FieldArrayRenderProps)=>(
                <div className="space-y-2" >
                    {form.values[involvedKey].map((_:string,idx:number)=>(
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
                    ))}
                                               
                </div>
                                      
            )}
        </FieldArray>
    );
};

export default FormikFieldArray;