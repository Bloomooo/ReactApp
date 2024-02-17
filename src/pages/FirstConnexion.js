import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/pages/_authentification.scss";
import Nav from "../components/Nav";
import { useSession } from "./Session";

const FirstConnection = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { emailUser } = useSession();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }
    console.log(emailUser);
    const email = emailUser;
    try {
      const res = await axios.post("http://localhost:8080/api/forgotpassword", {
        email,
        password,
      });
      if (res.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("Erreur lors de la première connexion: ", error);
      setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <div>
      <Nav />
      <div className="auth-container">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Configurer votre mot de passe</h2>
          <div className="form-group">
            <label htmlFor="password">Nouveau mot de passe</label>
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

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <div className="password-input-container">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "Masquer" : "Afficher"}
              </button>
            </div>
          </div>

          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button type="submit" className="btn-login">
            Configurer
          </button>
        </form>
      </div>
    </div>
  );
};

export default FirstConnection;
