"use client";

import React, { useState } from 'react'
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css"; // Import the CSS
import "../../css/custom-generic-calendar.css"
import DrawerForADay from '@/components/calendar-events/DrawerForADay';

const localizer = momentLocalizer(moment);

const calendarEvents = [
    {
        id: "1",
        title: "Meeting with Bob",
        description: "Discuss project updates and deadlines.",
        start: "2024-12-01T10:00:00Z",
        end: "2024-12-01T10:00:00Z",
        updatedAt: "2024-12-01T10:00:00Z"
    },
    {
        id: "2",
        title: "Team Lunch",
        description: "Lunch with the team to celebrate project completion.",
        start: "2024-12-02T12:00:00Z",
        end: "2024-12-02T12:00:00Z",
        updatedAt: "2024-12-02T12:00:00Z"
    },
    {
        id: "3",
        title: "Client Call",
        description: "Call with client to discuss requirements for the new project.",
        start: "2024-12-03T09:00:00Z",
        end: "2024-12-03T09:00:00Z",
        updatedAt: "2024-12-03T09:00:00Z"
    },
    {
        id: "4",
        title: "Conference",
        description: "Attend the tech conference for networking and learning.",
        start: "2024-12-05T08:30:00Z",
        end: "2024-12-05T08:30:00Z",
    }
];

const CalendarEvents = () => {

    const [isSheetOpen,setIsSheetOpen]  = useState<boolean>(false);
    const[selectedSlot,setSelectedSlot] = useState<Date|null>(null);

    
    const toggleSheet = ():void=>{
        setIsSheetOpen((prev):boolean=>!prev);
    }; 

    const handleEventClick = (event):void => {
        // alert(`Event: ${event.title}\nDescription: ${event.description}`);
        setSelectedSlot(event.start);
        toggleSheet()
    };

    const handleDateClick = (slotInfo):void=>{
        setSelectedSlot(slotInfo.start);
        toggleSheet()
    };

  return (
    <div className='h-full w-full' >
         <div className="w-full h-full flex flex-col  justify-between">
                        <div className="h-[10%]" >
                            <h2 className="text-3xl font-bold text-black " >Your Important Dates</h2>
                        </div>
                        <div className="h-[90%] w-full px-12 flex items-center justify-center " >
                            <Calendar
                                localizer={localizer}
                                startAccessor="start"
                                endAccessor="end"
                                events={calendarEvents}
                                defaultView="month" // Set default view to "month"
                                views={["month"]} // Restrict views to "month" only
                                onSelectEvent={handleEventClick} // Event click handler
                                onSelectSlot={handleDateClick} // Date click handler
                                selectable={true} // Enables slot selection
                                style={{ height: "90%", width:"100%" }} // Set full height for better visuals
                            />
                        </div>

                    </div>
                    {selectedSlot && (
                        <DrawerForADay isSheetOpen={isSheetOpen} toggleSheet={toggleSheet} selectedSlot={selectedSlot} />
                    )} 
    </div>
  )
}

export default CalendarEvents