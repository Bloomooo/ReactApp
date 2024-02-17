import React, { createContext, useContext, useState } from "react";

const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
  const [emailUser, setEmailUser] = useState("");

  const value = {
    emailUser,
    setEmailUser,
  };

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};
