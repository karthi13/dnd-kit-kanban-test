import React, { PropsWithChildren } from "react";
import { useDroppable } from "@dnd-kit/core";

interface DroppableProps {
  id: string;
}

export const Droppable: React.FC<PropsWithChildren<DroppableProps>> = ({
                                                                         id,
                                                                         children,
                                                                       }) => {
  const { setNodeRef, isOver } = useDroppable({ id });
  
  return (
    <div
      ref={setNodeRef}
      className={`column ${isOver ? "drop-indicator" : ""}`}
    >
      {children}
    </div>
  );
};
