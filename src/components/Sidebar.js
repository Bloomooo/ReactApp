import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/components/_sidebar.scss";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li>
          <NavLink to="/dashboard">Tableau de Bord</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/taches">Tableau des taches</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/edt">Emploi du temps</NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
