import React from "react";
import { Task } from "../interface/Task";
import "../styles/components/_taskcard.scss";

interface TaskCardProps {
  task: Task;
  onMove: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onMove }) => {
  const cardClasses = `taskCard ${task.isUrgent ? "urgent" : ""}`;

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("task-id", task.id.toString());
  };

  return (
    <div
      className={cardClasses}
      draggable="true"
      onDragStart={handleDragStart}
      onClick={() => onMove(task)}
    >
      {task.title}, {task.employee}
    </div>
  );
};

export default TaskCard;
