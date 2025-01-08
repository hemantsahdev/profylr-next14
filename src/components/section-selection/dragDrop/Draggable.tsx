import { useDraggable } from "@dnd-kit/core";
import React from "react";

const Draggable = (props) => {

    const {attributes,  listeners, setNodeRef, transform } =useDraggable({
        id: props.id,
    });
    
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;
  
    return (
        <div ref={setNodeRef} className="h-40 w-40 border bg-red-400" style={style}  {...listeners} {...attributes} >
            {props.children}
        </div>
    );
};

export default Draggable;