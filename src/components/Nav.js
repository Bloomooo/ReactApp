import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/components/_nav.scss";

const Nav = () => {
  // Composant Dropdown amélioré
  const Dropdown = ({ title, links }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
      <div className="dropdown">
        <button onClick={toggleDropdown} className="dropbtn">
          {title}
        </button>
        {isOpen && (
          <div className="dropdown-content">
            {links.map((link, index) => (
              <NavLink key={index} to={link.path} className="dropdown-item">
                {link.name}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    );
  };

  const departmentLinks = [
    { name: "Ressources Humaines", path: "/hr" },
    { name: "Support IT", path: "/it-support" },
    { name: "Finance", path: "/finance" },
  ];

  const projectLinks = [
    { name: "Projet A", path: "/project-a" },
    { name: "Projet B", path: "/project-b" },
  ];

  return (
    <nav className="navigation">
      <NavLink to="/" className="logo logo-link"></NavLink>

      <div className="menu">
        <ul>
          <li>
            <NavLink to="/dashboard">Tableau de Bord</NavLink>
          </li>
          <li>
            <Dropdown title="Départements" links={departmentLinks} />
          </li>
          <li>
            <Dropdown title="Projets" links={projectLinks} />
          </li>
          <li>
            <NavLink to="/company-news">Actualités de l'Entreprise</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
      </div>
      <NavLink
        to="/authentication"
        className="authentication authentification-link"
      ></NavLink>
    </nav>
  );
};

export default Nav;
