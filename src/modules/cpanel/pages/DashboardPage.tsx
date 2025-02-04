// src/modules/cpanel/pages/DashboardPage.tsx
import React from 'react';
import CPanelLayout from '../CPanelLayout';

const DashboardPage: React.FC = () => {
  return (
    <CPanelLayout>
      <h2>Dashboard</h2>
      <p>Aquí se mostrará información general del procesamiento de datos, estadísticas, etc.</p>
    </CPanelLayout>
  );
};

export default DashboardPage;
