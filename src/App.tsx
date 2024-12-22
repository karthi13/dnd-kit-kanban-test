import { useState } from "react";
import { DndContext, DragOverlay, closestCenter, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Droppable } from "./Droppable";
import { SortableItem } from "./SortableItem";
import "./App.css"

type Columns = {
  [key: string]: string[];
};

const initialColumns: Columns = {
  todo: ["Task 1", "Task 2", "Task 3"],
  inProgress: ["Task 4", "Task 5", "Task 6"],
  done: ["Task 7", "Task 8", "Task 9"],
};

export default function App() {
  const [columns, setColumns] = useState<Columns>(initialColumns);
  const [activeId, setActiveId] = useState<string | null>(null);
  
  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id as string);
  };
  
  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveId(null);
    
    if (!over) return;
    
    const [activeColumn, activeIndex] = findItem(active.id);
    const isOverColumn = Object.keys(columns).includes(over.id);
    const overColumn = isOverColumn ? over.id : findItem(over.id)[0];
    const overIndex = isOverColumn
      ? columns[overColumn].length // Dropped at the end of the column
      : findItem(over.id)[1];
    
    if (activeColumn === overColumn) {
      // Reorder within the same column
      const updatedItems = arrayMove(
        columns[activeColumn],
        activeIndex,
        overIndex
      );
      setColumns((prev) => ({ ...prev, [activeColumn]: updatedItems }));
    } else {
      // Move to a different column
      const activeItems = [...columns[activeColumn]];
      const overItems = [...columns[overColumn]];
      
      // Remove from source column
      activeItems.splice(activeIndex, 1);
      
      // Add to target column
      overItems.splice(overIndex, 0, active.id as string);
      
      setColumns((prev) => ({
        ...prev,
        [activeColumn]: activeItems,
        [overColumn]: overItems,
      }));
    }
  };

  
  const findItem = (id: string): [string, number] => {
    for (const [column, items] of Object.entries(columns)) {
      const index = items.indexOf(id);
      if (index > -1) return [column, index];
    }
    return ["", -1];
  };
  
  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="kanban">
        {Object.entries(columns).map(([column, items]) => (
          <Droppable key={column} id={column}>
            <h2 className="column-title">{column}</h2>
            <SortableContext
              items={items}
              strategy={verticalListSortingStrategy}
            >
              {items.map((item) => (
                <SortableItem key={item} id={item} activeId={activeId} />
              ))}
            </SortableContext>
          </Droppable>
        ))}
      </div>
      
      {/* Drag Overlay */}
      <DragOverlay>
        {activeId ? <div className="drag-overlay">{activeId}</div> : null}
      </DragOverlay>
    </DndContext>
  );
}
