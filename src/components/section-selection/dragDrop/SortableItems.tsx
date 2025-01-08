import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import {CSS} from "@dnd-kit/utilities";

const SortableItems = ({id,children}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: id});
      
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
      
    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {children}
        </div>
    );
};

export default SortableItems;