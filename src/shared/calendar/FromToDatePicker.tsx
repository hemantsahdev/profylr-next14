import React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FormikHelpers, FormikValues } from "formik";

interface FromToDatePickerProps<T extends FormikValues> {
    values : T ,
    setFieldValue : FormikHelpers<T>["setFieldValue"],
    involvedKey : keyof T
}

/*
MANDATORY
    involvedKey:{
        from:Date,
        to:Date
    }
*/

const FromToDatePicker = <T extends FormikValues >({values,setFieldValue,involvedKey}:FromToDatePickerProps<T>) => {

    return (
        <div className="grid grid-cols-2 gap-4 " >
            <div>
                <Popover>
                    <PopoverTrigger asChild={true}>
                        <div className="flex items-center gap-2">

                            <Label >From:</Label>
                            <Button
                                id="fromBtn"
                                variant="outline"
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !values[involvedKey].from && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {values[involvedKey].from ? (
                                    format(values[involvedKey].from, "PPP")
                                ) : (
                                    <span>From date</span>
                                )}
                            </Button>
                        </div>

                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={values[involvedKey].from}
                            onSelect={(date) => setFieldValue(`${String(involvedKey)}.from`, date)}
                            initialFocus={true}
                        />
                    </PopoverContent>
                </Popover>
            </div>

            <div>
                <Popover>
                    <PopoverTrigger asChild={true}>
                        <div className="flex items-center gap-2" >
                            <Label>To:</Label>
                            <Button
                                variant="outline"
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !values[involvedKey].to && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {values[involvedKey].to ? (
                                    format(values[involvedKey].to, "PPP")
                                ) : (
                                    <span>To date</span>
                                )}
                            </Button>
                        </div>

                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={values[involvedKey].to}
                            onSelect={(date) => setFieldValue(`${String(involvedKey)}.to`, date)}
                            initialFocus={true}
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
};

export default FromToDatePicker;