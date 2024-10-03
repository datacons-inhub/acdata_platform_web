// ClientDashboard.tsx
import React, { useState } from 'react';
import CPHeader from './cheader/cheader';
import CPSidebar from './csidebar/csidebar';
import { DashboardWrapper, MainContent } from './ControlPanel.styles';

import DashboardView from './cbody/views/DashboardView';
import DataConnectionView from './cbody/views/DataConnectionView';
import AutomationView from './cbody/views/AutomationView'; 
import ProjectsView from './cbody/views/ProjectsView';
import AccountView from './cbody/views/Account';
import PresentationView from './cbody/views/PresentationView';

interface CPanelProps {
  toggleTheme: () => void;
  theme: string;
}
const CPanel: React.FC<CPanelProps> = ({ toggleTheme, theme }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('dashboard');
  //const [selectedMenu, setSelectedMenu] = useState('account');
  const toggleMenu = () => setMenuOpen(!menuOpen);


  const renderView = () => {
      switch (selectedMenu) {
          case 'account':
              return <AccountView />;
          case 'dashboard':
                return <DashboardView />;
          case 'data':
              return <DataConnectionView />;
          case 'automation':
              return <AutomationView />;
          case 'projects':
              return <ProjectsView />;
          default:
              return <PresentationView />;
      }
  };

  return (
    <div>
      {/* Header Fijo en la Parte Superior */}
      <CPHeader toggleTheme={toggleTheme} theme={theme} toggleMenu={toggleMenu} />
      {/* CPanel con Sidebar */}
      <DashboardWrapper>
        <CPSidebar menuOpen={menuOpen} setSelectedMenu={setSelectedMenu} />
        <MainContent>
          {renderView()}
        </MainContent>
      </DashboardWrapper>
    </div>
  );
};

export default CPanel;
