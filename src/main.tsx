// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './styles/globals.css'; // Importamos estilos globales
import { GlobalProvider } from "./modules/cpanel/context/GlobalContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalProvider>
      <QueryClientProvider client={queryClient}>

        <BrowserRouter>
          <App />
        </BrowserRouter>

      </QueryClientProvider>
    </GlobalProvider>
  </React.StrictMode>
);
