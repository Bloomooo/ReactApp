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
  const [editingTask, setEditingTask] = useState<null | Task>(null);
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
      id: 4,
      title: "Tâche 4",
      status: "En cours",
      isUrgent: true,
      employee: "ez",
    },
  ]);

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setShowForm(false);
        clearForm();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const clearForm = () => {
    setNewTaskTitle("");
    setNewTaskUrgency(false);
    setNewTaskEmployee("");
    setNewTaskStatus("À faire");
    setEditingTask(null);
  };

  const handleFormToggle = (task?: Task) => {
    if (task) {
      setEditingTask(task);
      setNewTaskTitle(task.title);
      setNewTaskUrgency(task.isUrgent);
      setNewTaskEmployee(task.employee);
      setNewTaskStatus(task.status);
    } else {
      clearForm();
    }
    setShowForm(!showForm);
  };

  const handleTaskSubmit = () => {
    if (editingTask) {
      const updatedTasks = tasks.map((task) =>
        task.id === editingTask.id
          ? {
              ...task,
              title: newTaskTitle,
              isUrgent: newTaskUrgency,
              employee: newTaskEmployee,
              status: newTaskStatus,
            }
          : task
      );
      setTasks(updatedTasks);
    } else {
      const newTask = {
        id: tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
        title: newTaskTitle,
        isUrgent: newTaskUrgency,
        employee: newTaskEmployee,
        status: newTaskStatus,
      };
      setTasks([...tasks, newTask]);
    }
    setShowForm(false);
    clearForm();
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

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

  return (
    <div className="todoList">
      <div className="taskInput">
        <button className="addButton" onClick={() => handleFormToggle()}>
          <span>+</span>
          <span className="addButtonText">Ajouter une tâche</span>
        </button>
        {showForm && (
          <div ref={formRef} className="taskForm">
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
              />
              Urgent
            </label>
            <input
              type="text"
              placeholder="Employé"
              value={newTaskEmployee}
              onChange={(e) => setNewTaskEmployee(e.target.value)}
            />
            <label>Status :</label>
            <select
              value={newTaskStatus}
              onChange={(e) => setNewTaskStatus(e.target.value)}
            >
              <option value="À faire">À faire</option>
              <option value="En cours">En cours</option>
              <option value="Terminé">Terminé</option>
            </select>
            <button onClick={handleTaskSubmit}>Confirmer</button>
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
                  onDelete={() => deleteTask(task.id)}
                  onEdit={() => handleFormToggle(task)}
                />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToDoList;
