import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import EventCard from "./EventCard";

const EventsOnADay = ({calendarEvents}) => {

    const [events, setEvents] = useState([]);
    const [isAddEventOpen, setIsAddEventOpen] = useState<boolean>(false);
  
    useEffect(()=>{
        if(calendarEvents){
            setEvents(calendarEvents);
        }
    },[calendarEvents]);

    // const addEvent = (newEvent) => {
    //     setEvents([...events, newEvent]);
    // };
  
    // const deleteEvent = (id: string) => {
    //     setEvents(events.filter(event => event.id !== id));
    // };
  
    // const updateEvent = (updatedEvent) => {
    //     setEvents(()=> events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
    // };

    return(
        <>
            <h1>Hello dummy! All commented out for now</h1>
            {/* <div className="flex flex-col gap-4" >
                {/* header *
                <div className="w-full flex items-center justify-end " >
                    <Button  >
                        <Plus className="mr-2 h-4 w-4" /> Add Event
                    </Button>
                </div>
                <div className="h-[32rem] flex flex-col gap-5 overflow-y-auto custom-scrollbar" >
                    {events.map(event => (
                        <EventCard 
                            key={event.id} 
                            event={event} 
                            onDelete={deleteEvent} 
                            onUpdate={updateEvent} 
                        />
                    ))}
                </div>

                {/* <AddEventDialog
                    isOpen={isAddEventOpen} 
                    onClose={() => setIsAddEventOpen(false)} 
                    onAdd={addEvent}  /> 
           
            </div>
          */}
        </>
    );
};

export default EventsOnADay;