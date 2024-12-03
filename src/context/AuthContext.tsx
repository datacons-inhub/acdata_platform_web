import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { login as loginService, getToken } from '../services/authService';
import logger from '../utils/logger';

interface User {
  user_id: number;
 // email: string;
  // Agrega otras propiedades de usuario aquí
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: () => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const login = async () => {
    logger.info('Logging in...');
    try {
      const token = await loginService();
      if (token) {
        // Aquí puedes agregar lógica para obtener y establecer la información del usuario
        setIsAuthenticated(true);
        setUser({ user_id: 1 }); // Reemplaza con datos reales del usuario
        //        setUser({ user_id: 1, email: 'acdata.process@acme.com' }); 
        logger.info('User logged in successfully');
      }
    } catch (error) {
      logger.error(`Login failed: ${error}`);
    }
  };

  const logout = () => {
    logger.info('Logging out...');
    localStorage.removeItem('access_token');
    setIsAuthenticated(false);
    setUser(null);
    logger.info('User logged out');
  };

  useEffect(() => {
    logger.info('Checking for existing token...');
    const token = getToken();
    if (token) {
      // Aquí puedes agregar lógica para obtener y establecer la información del usuario
      setIsAuthenticated(true);
      setUser({ user_id: 1 }); // Reemplaza con datos reales del usuario
      //setUser({ user_id: 1, email: 'acdata.process@acme.com' }); // Reemplaza con datos reales del usuario
      logger.info('User authenticated from token');
    } else {
      logger.info('No existing token found');
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext };