import React, { useState } from "react";
import "../styles/pages/_authentification.scss";
import Nav from "../components/Nav";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useSession } from "./Session";

const Authentification = () => {
  const [isDarkMode] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setEmailUser } = useSession();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/authentification",
        {
          email,
          password,
        }
      );
      if (res.status === 200) {
        const token = res.data.jwtMap;
        const decodedToken = jwtDecode(token);
        setEmailUser(decodedToken.sub);
        if (decodedToken.firsttime) {
          navigate("/first");
        } else {
          navigate("/");
        }
        setErrorMessage("");
      }
    } catch (error) {
      console.error("Il y a eu une erreur !", error);
      setErrorMessage("Email ou mot de passe incorrect.");
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
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Masquer" : "Afficher"}
              </button>
            </div>
          </div>
          <button type="submit" className="btn-login">
            Se connecter
          </button>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="links">
            <NavLink to="/forgot">Mot de passe oublié ?</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Authentification;
