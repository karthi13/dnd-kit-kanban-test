import { useSortable } from '@dnd-kit/sortable';
import { Task } from '../../types';
import "./Task.css"

type TaskCardProps = {
  task: Task;
};

export default function TaskCard({ task }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: task.id,
    data: {
      status: task.status
    }
  });
  
  const style = transform
    ? {
      transform: `translate(${transform.x}px, ${transform.y}px)`,
    }
    : undefined;
  
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="container"
      style={style}
    >
      <h3 >{task.title}</h3>
      <p >{task.description}</p>
    </div>
  );
}