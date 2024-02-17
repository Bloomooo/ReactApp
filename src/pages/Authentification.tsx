import React, { useState } from "react";
import "../styles/pages/_authentification.scss";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useSession } from "./Session";


interface DecodedToken {
  sub: string; 
  firsttime?: boolean;
}

const Authentification = () => {
  const [isDarkMode] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { setEmailUser } = useSession();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/authentification", {
        email,
        password,
      });
      if (res.status === 200) {
        const token: string = res.data.jwtMap; 
        const decodedToken: DecodedToken = jwtDecode(token);
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
