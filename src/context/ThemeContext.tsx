import React, 
{ createContext, 
  useState, 
  useContext, 
  useEffect
} from 'react';

// Definir tipos para el contexto de tema
type Theme = 'light' | 'dark';
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

// Crear el contexto de tema
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Proveedor de contexto de tema
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Inicializar el tema desde localStorage, con valor por defecto 'light'
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('app-theme') as Theme;
    return savedTheme || 'light';
  });

  // Alternar entre temas
  const toggleTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('app-theme', newTheme);
  };

  // Aplicar clase de tema al body para estilos globales
  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personalizado para usar el contexto de tema
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe ser usado dentro de un ThemeProvider');
  }
  return context;
};