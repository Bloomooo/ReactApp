import React, { createContext, useContext, useState, ReactNode } from "react";

interface SessionContextType {
  emailUser: string;
  setEmailUser: (email: string) => void;
}


const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const useSession = () => {

  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession doit être utilisé au sein d'un SessionProvider");
  }
  return context;
};


interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const [emailUser, setEmailUser] = useState<string>("");

  const value = {
    emailUser,
    setEmailUser,
  };

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};
