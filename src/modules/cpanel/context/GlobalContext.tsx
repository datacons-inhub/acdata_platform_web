import React, { createContext, useContext, useState } from "react";

// Tipo para definir el contexto
interface GlobalContextProps {
  userId: number;
  setUserId: (id: number) => void;
}


const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);


// Proveedor del contexto
export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<number>(1); // Valor inicial hardcodeado

  return (
    <GlobalContext.Provider value={{ userId, setUserId }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Hook para consumir el contexto
export const useGlobalContext = (): GlobalContextProps => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};