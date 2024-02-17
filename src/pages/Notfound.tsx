import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/pages/_notfound.scss";

const NotFound = () => {
  return (
    <div>
      <div className="notfound-container">
        <h1>404</h1>
        <p>Oups! La page que vous recherchez semble introuvable.</p>
        <div className="notfound">Erreur 404 - Page non trouvée</div>

        <div className="notfound-image-container"></div>

        <div className="options">
          <NavLink to="/">Retour à la page d'accueil</NavLink>
        </div>
        <p>Essayez de rechercher ou continuez à explorer notre site.</p>
      </div>
    </div>
  );
};

export default NotFound;
