// src/modules/cpanel/CPanelLayout.tsx
import React, { useState } from 'react';
import CPanelHeader from './components/Header/CPanelHeader';
import CPanelSidebar from './components/Sidebar/CPanelSidebar';
import MainContent from './components/MainContent/MainContent';
import './CPanelLayout.css'; // Estilos globales del layout (si se requiere)

interface CPanelLayoutProps {
  syncData?: any;
  error?: string | null;
}

const CPanelLayout: React.FC<CPanelLayoutProps> = ({ syncData, error }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState('dashboards');

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="cpanel-container">
      <CPanelHeader
        onToggleSidebar={toggleSidebar}
        title="Panel de Control de ACDATA"
        syncData={syncData}
        error={error}
        onOptionChange={(opt) => setSelectedOption(opt)}
      />
      <div className="cpanel-body">
      <CPanelSidebar
          isOpen={sidebarOpen}
          selectedOption={selectedOption}
          onSelectOption={(opt) => setSelectedOption(opt)}
        />
        <MainContent sidebarOpen={sidebarOpen} selectedOption={selectedOption} />

      </div>
    </div>
  );
};

export default CPanelLayout;
