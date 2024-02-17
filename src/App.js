import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Ez from "./pages/Ez";
import Authentification from "./pages/Authentification";
import FirstConnection from "./pages/FirstConnexion";
import Forgot from "./pages/Forgot";
import { SessionProvider } from "./pages/Session";
import NotFound from "./pages/Notfound";

const App = () => {
  return (
    <SessionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ez" element={<Ez />} />
          <Route path="/authentification" element={<Authentification />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/first" element={<FirstConnection />} />
          <Route path="/forgot" element={<Forgot />} />
        </Routes>
      </BrowserRouter>
    </SessionProvider>
  );
};

export default App;
