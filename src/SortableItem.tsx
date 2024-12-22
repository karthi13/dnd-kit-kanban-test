import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableItemProps {
  id: string;
  activeId: string | null;
}

export const SortableItem: React.FC<SortableItemProps> = ({ id, activeId }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });
  
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1, // Optional for visual effect
  };
  
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`task ${activeId === id ? "placeholder" : ""}`}
      {...attributes}
      {...listeners}
    >
      {id}
    </div>
  );
};
