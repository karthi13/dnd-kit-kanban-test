import { useDroppable } from '@dnd-kit/core';
import TaskCard from '../task/Task.tsx';
import { Column as ColumnType, Task } from '../../types';
import "./Column.css"

type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
};

export default function Column({ column, tasks }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });
  
  return (
    <div className="Column">
      <h2 className="mb-4 font-semibold text-neutral-100">{column.title}</h2>
      <div ref={setNodeRef} className="flex flex-1 flex-col gap-4">
        {tasks.map((task) => {
          return <TaskCard key={task.id} task={task} />;
        })}
      </div>
    </div>
  );
}