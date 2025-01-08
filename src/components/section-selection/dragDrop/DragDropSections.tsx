"use client";

import React, { useState } from "react";
import {closestCenter, DndContext} from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy} from "@dnd-kit/sortable";
import Draggable from "./Draggable";
import Droppable from "./Droppable";
import SortableItems from "./SortableItems";
  
const DragDropSections = () => {

    const [items, setItems] = useState([1, 2, 3]);


    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>

            <SortableContext 
                items={items}
                strategy={verticalListSortingStrategy}
            >
                <div className="flex flex-col gap-8" >

                    {items.map(id =>
                        <SortableItems key={id} id={id} >
                            <div className="h-[6rem] w-[10rem] bg-red-300 " >
                                Hello
                            </div>
                        </SortableItems> )}
                </div>
            </SortableContext>
           
        </DndContext>
    );

    function handleDragEnd(event) {
        const {active, over} = event;
        
        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over.id);
            
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }
};

export default DragDropSections;