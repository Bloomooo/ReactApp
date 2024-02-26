import React, { useState } from "react";
import TaskCard from "./TaskCard";
import { Task } from "../interface/Task";
import "../styles/components/_todolist.scss";
const ToDoList = () => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Tâche 1", status: "À faire" },
    { id: 2, title: "Tâche 2", status: "En cours" },
    { id: 3, title: "Tâche 3", status: "Terminé" },
    { id: 6, title: "Tâche 6", status: "En cours" },
  ]);

  const moveTask = (taskToMove: Task) => {
    const newStatus: Task["status"] =
      taskToMove.status === "À faire"
        ? "En cours"
        : taskToMove.status === "En cours"
        ? "Terminé"
        : "À faire";
    const updatedTasks = tasks.map((task) =>
      task.id === taskToMove.id ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      const newTask: Task = {
        id: Math.max(...tasks.map((task) => task.id)) + 1,
        title: newTaskTitle,
        status: "À faire",
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
        <div className="column">
          <h2>À faire</h2>
          {tasks
            .filter((task: Task) => task.status === "À faire")
            .map((task: Task) => (
              <TaskCard key={task.id} task={task} onMove={moveTask} />
            ))}
        </div>
        <div className="column">
          <h2>En cours</h2>
          {tasks
            .filter((task: Task) => task.status === "En cours")
            .map((task: Task) => (
              <TaskCard key={task.id} task={task} onMove={moveTask} />
            ))}
        </div>
        <div className="column">
          <h2>Terminé</h2>
          {tasks
            .filter((task: Task) => task.status === "Terminé")
            .map((task: Task) => (
              <TaskCard key={task.id} task={task} onMove={moveTask} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
