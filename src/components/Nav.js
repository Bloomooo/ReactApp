import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/components/_nav.scss";

const Nav = () => {
  return (
    <nav className="navigation">
      <NavLink to="/" className="logo logo-link"></NavLink>

      <div className="menu">
        <ul>
          <li>
            <NavLink to="/">Accueil</NavLink>
          </li>
          <li>
            <NavLink to="/ez">Ez</NavLink>
          </li>
          <li>
            <NavLink to="/e">Accueil</NavLink>
          </li>
          <li>
            <NavLink to="/ezz">Ez</NavLink>
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
