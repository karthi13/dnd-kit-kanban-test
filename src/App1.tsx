import { useState } from 'react'
import {DndContext, DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from "@dnd-kit/sortable";
import type { Task, Column as ColumnType } from './types';
import Column from './components/column/Column.tsx';
import "./App.css"

const COLUMNS: ColumnType[] = [
  { id: 'TODO', title: 'To Do' },
  { id: 'IN_PROGRESS', title: 'In Progress' },
  { id: 'DONE', title: 'Done' },
];

const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Research Project',
    description: 'Gather requirements and create initial documentation',
    status: 'TODO',
  },
  {
    id: '2',
    title: 'Design System',
    description: 'Create component library and design tokens',
    status: 'TODO',
  },
  {
    id: '3',
    title: 'API Integration',
    description: 'Implement REST API endpoints',
    status: 'IN_PROGRESS',
  },
  {
    id: '4',
    title: 'Testing',
    description: 'Write unit tests for core functionality',
    status: 'DONE',
  },
];

export default function App1() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  
  const getTaskPos = (id) => tasks.findIndex((task) => task.id === id);
  
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    
    console.log({
      active: active,
      over: over,
    })
    
    if (!over) return;
    
    setTasks((tasks) => {
      
      if (active?.data?.current?.status === over.id) {
        const originalPos = getTaskPos(active.id);
        console.log("Same column don't do nothing", originalPos);
      }
      
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);
      
      console.log(originalPos, newPos);
      
      return arrayMove(tasks, originalPos, newPos);
    });
    
    // setTasks(() =>
    //   tasks.map((task) =>
    //     task.id === taskId
    //       ? {
    //         ...task,
    //         status: newStatus,
    //       }
    //       : task,
    //   ),
    // );
  }
  
  return (
    <div className="App">
      <DndContext onDragEnd={handleDragEnd} >
        {COLUMNS.map((column) => {
          return (
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)}
            />
          );
        })}
      </DndContext>
    </div>
  );
}
