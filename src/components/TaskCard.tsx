import React from "react";
import { Task } from "../interface/Task";
import "../styles/components/_taskcard.scss";

interface TaskCardProps {
  task: Task;
  onMove: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onMove }) => {
  return (
    <div className="taskCard" onClick={() => onMove(task)}>
      {task.title}
    </div>
  );
};

export default TaskCard;
