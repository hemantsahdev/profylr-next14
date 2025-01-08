import React from "react";
import {useDroppable} from "@dnd-kit/core";

const Droppable = (props) => {

    const {isOver,setNodeRef} = useDroppable({
        id: props.id,
    });
    const style = {
        backgroundColor: isOver ? "green" : undefined,
    };
    
    return (
        <div ref={setNodeRef} style={style} className="h-44 w-48 border border-green-500" >
            {props.children}
        </div>
    );
};

export default Droppable;