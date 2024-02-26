import React, { useState, useRef, useEffect } from "react";
import TaskCard from "./TaskCard";
import { Task } from "../interface/Task";
import "../styles/components/_todolist.scss";

const ToDoList = () => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskUrgency, setNewTaskUrgency] = useState(false);
  const [newTaskEmployee, setNewTaskEmployee] = useState("");
  const [newTaskStatus, setNewTaskStatus] = useState("À faire");
  const [showForm, setShowForm] = useState(false);
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

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setShowForm(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [formRef]);

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
        id: Math.max(0, ...tasks.map((task) => task.id)) + 1,
        title: newTaskTitle,
        status: newTaskStatus,
        isUrgent: newTaskUrgency,
        employee: newTaskEmployee,
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
      setNewTaskUrgency(false);
      setNewTaskEmployee("");
      setNewTaskStatus("À faire");
      setShowForm(false);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="todoList">
      <div className="taskInput">
        <button className="addButton" onClick={toggleForm}>
          <span>+</span>
          <span className="addButtonText">Ajouter une carte</span>
        </button>
        {showForm && (
          <div ref={formRef}>
            <input
              type="text"
              placeholder="Titre de la tâche"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
            />
            <label>
              <input
                type="checkbox"
                checked={newTaskUrgency}
                onChange={(e) => setNewTaskUrgency(e.target.checked)}
              />{" "}
              Urgent
            </label>
            <input
              type="text"
              placeholder="Employé"
              value={newTaskEmployee}
              onChange={(e) => setNewTaskEmployee(e.target.value)}
            />
            Status :
            <select
              value={newTaskStatus}
              onChange={(e) => setNewTaskStatus(e.target.value)}
            >
              <option value="À faire">À faire</option>
              <option value="En cours">En cours</option>
              <option value="Terminé">Terminé</option>
            </select>
            <button onClick={addTask}>Ajouter</button>
          </div>
        )}
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
