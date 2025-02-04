// src/App.tsx
import React from 'react';
import AppRoutes from './routes';
import { ThemeProvider } from './state/ThemeContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  );
};

export default App;
