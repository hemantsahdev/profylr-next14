"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";


interface FlexibleDatePickerProps {
  year?: boolean
  month?: boolean
  day?: boolean
  onChange: (date: Date | null) => void
  initialDate?: Date
  disabled? : boolean
  placeholder ?: string
}

const FlexibleDatePicker = ({ year = true, month = true, day = true, onChange, initialDate, disabled = false , placeholder = "Select a date"}: FlexibleDatePickerProps) =>{

    const [date, setDate] = useState<Date | undefined>(initialDate);

    const handleSelect = (newDate: Date | undefined) => {
        setDate(newDate);
        onChange(newDate || null);
    };

    const yearOptions = useMemo(() => {
        const currentYear = new Date().getFullYear();
        return Array.from({ length: 10 }, (_, i) => currentYear - i);
    }, []);

    const monthOptions = useMemo(() => {
        return Array.from({ length: 12 }, (_, i) => {
            const date = new Date(2000, i, 1);
            return { value: i.toString(), label: format(date, "MMMM") };
        });
    }, []);

    const formatDate = () => {
        if (!date) return "";
        if (year && !month && !day) return format(date, "yyyy");
        if (year && month && !day) return format(date, "MMMM yyyy");
        return format(date, "PPP");
    };

    if (year && !month && !day) {
        return (
            <Select onValueChange={(value) => handleSelect(new Date(parseInt(value), 0, 1))} disabled={disabled} >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                    {yearOptions.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                            {year}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        );
    }

    if (year && month && !day) {
        return (
            <div className="flex space-x-2">
                <Select
                    onValueChange={(value) =>
                        handleSelect(date ? new Date(date.getFullYear(), parseInt(value), 1) : undefined)
                    }
                    disabled={disabled}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                        {monthOptions.map((month) => (
                            <SelectItem key={month.value} value={month.value}>
                                {month.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select
                    onValueChange={(value) =>
                        handleSelect(date ? new Date(parseInt(value), date.getMonth(), 1) : undefined)
                    }
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                        {yearOptions.map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                                {year}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        );
    }

    return (
        <>
            <Popover>
                <PopoverTrigger asChild={true}>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                        disabled={disabled}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? formatDate() : <span>{placeholder}</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleSelect}
                        initialFocus={true}
                        disabled={disabled}
                    />
                </PopoverContent>
            </Popover>
        </>

    );
};

export default FlexibleDatePicker;