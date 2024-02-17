import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/components/_nav.scss";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`navigation ${menuOpen ? "open" : ""}`}>
      <NavLink to="/" className="logo logo-link"></NavLink>

      <div className="menu">
        <button className="menu-toggle" onClick={toggleMenu}>
          Menu
        </button>
        <ul className={`${menuOpen ? "open" : ""}`}>
          <li>
            <NavLink to="/" onClick={toggleMenu}>
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard" onClick={toggleMenu}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/ez" onClick={toggleMenu}>
              Ez
            </NavLink>
          </li>
        </ul>
      </div>

      <NavLink
        to="/authentification"
        className="authentication authentification-link"
      ></NavLink>
    </nav>
  );
};

export default Nav;
