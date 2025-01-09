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
        <div ref={setNodeRef} style={style} className="h-full w-full"  >
            {props.children}
        </div>
    );
};

export default Droppable;