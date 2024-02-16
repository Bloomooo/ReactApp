import React, { useState } from "react";
import "../styles/pages/_authentification.scss";
import Nav from "../components/Nav";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Authentification = () => {
  const [isDarkMode] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const firstTime = false;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/authentification",
        {
          email,
          password,
          firstTime,
        }
      );
      console.log("Réponse du serveur :", res.data);
    } catch (error) {
      console.error("Il y a eu une erreur !", error);
    }
  };

  return (
    <div>
      <Nav />
      <div className={`auth-container ${isDarkMode ? "dark" : "light"}`}>
        <form
          className={`auth-form ${isDarkMode ? "dark" : "light"}`}
          onSubmit={handleSubmit}
        >
          <h2>Connexion</h2>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-login">
            Se connecter
          </button>
          <div className="links">
            <NavLink to="/forgot">Mot de passe oublié ?</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Authentification;
