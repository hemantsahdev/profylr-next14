import React from "react";
import {useDroppable} from "@dnd-kit/core";

const Droppable = (props) => {

    const {isOver,setNodeRef} = useDroppable({
        id: props.id,
    });
  
    return (
        <div ref={setNodeRef}  className="h-full w-full"  >
            {props.children}
        </div>
    );
};

export default Droppable;