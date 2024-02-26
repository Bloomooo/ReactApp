import React, { useState } from "react";
import TaskCard from "./TaskCard";
import { Task } from "../interface/Task";
import "../styles/components/_todolist.scss";

const ToDoList = () => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Tâche 1",
      status: "À faire",
      isUrgent: false,
      employee: "ez",
    },
    {
      id: 2,
      title: "Tâche 2",
      status: "En cours",
      isUrgent: true,
      employee: "ez",
    },
    {
      id: 3,
      title: "Tâche 3",
      status: "Terminé",
      isUrgent: true,
      employee: "ez",
    },
    {
      id: 6,
      title: "Tâche 6",
      status: "En cours",
      isUrgent: true,
      employee: "ez",
    },
  ]);

  const moveTask = (updatedTask: Task) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id
        ? { ...task, status: updatedTask.status }
        : task
    );
    setTasks(updatedTasks);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    newStatus: Task["status"]
  ) => {
    e.preventDefault();
    const taskId = parseInt(e.dataTransfer.getData("task-id"), 10);
    const taskToMove = tasks.find((task) => task.id === taskId);
    if (taskToMove) {
      moveTask({ ...taskToMove, status: newStatus });
    }
  };

  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      const newTask: Task = {
        id: Math.max(...tasks.map((task) => task.id)) + 1,
        title: newTaskTitle,
        status: "À faire",
        isUrgent: true,
        employee: "ez",
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
    }
  };

  return (
    <div className="todoList">
      <div className="taskInput">
        <input
          type="text"
          placeholder="Ajouter une nouvelle tâche..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTask()}
        />
        <button onClick={addTask}>+</button>
      </div>
      <div className="columns">
        {["À faire", "En cours", "Terminé"].map((status) => (
          <div
            key={status}
            className="column"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, status)}
          >
            <h2>{status}</h2>
            {tasks
              .filter((task) => task.status === status)
              .map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onMove={() => moveTask({ ...task, status })}
                />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToDoList;
