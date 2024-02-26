import React, { useState } from "react";
import { Task } from "../interface/Task";
import "../styles/components/_taskcard.scss";

interface TaskCardProps {
  task: Task;
  onMove: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onMove }) => {
  const [showDetails, setShowDetails] = useState(false);
  const cardClasses = `taskCard ${task.isUrgent ? "urgent" : ""}`;

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("task-id", task.id.toString());
  };

  const handleClick = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div
      className={cardClasses}
      draggable="true"
      onDragStart={handleDragStart}
      onClick={handleClick}
    >
      {showDetails ? (
        <div>
          <p>Title : {task.title}</p>
          <p>Employee : {task.employee}</p>
          <p>Urgent ? : {task.isUrgent ? "Oui" : "Non"}</p>
          <p>Status : {task.status}</p>
        </div>
      ) : (
        <div>
          {task.title}, {task.employee}
        </div>
      )}
    </div>
  );
};

export default TaskCard;
