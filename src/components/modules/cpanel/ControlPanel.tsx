// acMe - 261024
import React, { useState, useEffect } from 'react';
import CPHeader from './cheader/cheader';
import CPSidebar from './csidebar/csidebar';
import { syncUser } from '../../../services/syncService';
import { useAuth } from '../../../context/AuthContext';
import { DashboardWrapper, MainContent } from './ControlPanel.styles';
//Sidebar options
import DashboardView from './cbody/views/DashboardView';
import DataConnectionView from './cbody/views/DataConnectionView';
import AutomationView from './cbody/views/AutomationView'; 
import ProjectsView from './cbody/views/ProjectsView';
import AccountView from './cbody/views/Account';
import PresentationView from './cbody/views/PresentationView';
import logger from '../../../utils/logger';

interface CPanelProps {
  toggleTheme: () => void;
  theme: string;
}

const CPanel: React.FC<CPanelProps> = ({ toggleTheme, theme }) => {
  const { user, isAuthenticated, login: authLogin } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('dashboard');
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);


  useEffect(() => {
    const authenticateAndSync = async () => {
      try {
        console.log('[Control Panel] isAuthenticated', isAuthenticated);
        if (!isAuthenticated) {
          await authLogin(); // Llama al servicio de autenticación solo si no está autenticado
        }
        if (user && user.user_id) {
          logger.info(`Sincronizando usuario: ${isAuthenticated}`);
          const response = await syncUser(user.user_id);
          console.log('[Control Panel]', response);
          if (response.success) {
            logger.info(`Usuario sincronizado: ${response.message}`);
            setSyncMessage(`${response.message}`);
          } else {
            logger.error(`Error en sincronización: ${response.error.message}`);
            setSyncMessage(`Error en sincronización: ${response.error.message}`);
          }
        }
      } catch (error: any) {
        logger.error(`Error en la autenticación o sincronización: ${error.response?.data?.message || error.message}`);
        setSyncMessage(`Error en la autenticación o sincronización: ${error.response?.data?.message || error.message}`);
      }
    };

    authenticateAndSync();
  }, [user]);


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
        {syncMessage && <div>{syncMessage}</div>}

          {renderView()}
        </MainContent>
      </DashboardWrapper>
    </div>
  );
};

export default CPanel;
