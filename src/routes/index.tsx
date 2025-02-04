// src/routes/index.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages'; // Asumiendo que HomePage esta en pages/index.tsx
import CPanelLayout from '../pages/cpanel';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cpanel" element={<CPanelLayout />} />
      {/* Agregar más rutas si es necesario */}
    </Routes>
  );
};

export default AppRoutes;