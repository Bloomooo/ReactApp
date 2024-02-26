import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import DashboardContent from "../components/DashboardContent";
import ToDoList from "../components/ToDoList";
import "../styles/pages/_dashboard.scss";
import Edt from "../components/Edt";

const Dashboard = () => {
  return (
    <div>
      <div className="dashboard-container">
        <Sidebar />
        <Routes>
          <Route path="/" element={<DashboardContent />} />
          <Route path="/taches" element={<ToDoList />} />
          <Route path="/edt" element={<Edt />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
