import React from 'react';
import { 
  FaDatabase, 
  FaTachometerAlt, 
  FaRobot, 
  FaProjectDiagram, 
  FaUser 
} from 'react-icons/fa';
import { SidebarWrapper, MenuItem } from './csidebar.styles';

interface CPanelSidebarProps {
  menuOpen: boolean;
  setSelectedMenu: (menu: string) => void;
}

const CPanelSidebar: React.FC<CPanelSidebarProps> = ({ menuOpen, setSelectedMenu }) => {

  //const menuOptions = ['Mi Cuenta', 'Mis Proyectos', 'Dashboard', 'Conectar Data', 'Automatizado'];

  return (
    <SidebarWrapper isOpen={menuOpen}>
      <MenuItem onClick={() => setSelectedMenu('account')}>
          <FaUser /> Mi Cuenta
      </MenuItem>
      <MenuItem onClick={() => setSelectedMenu('projects')}>
          <FaProjectDiagram /> Mis Proyectos
      </MenuItem>
      <MenuItem onClick={() => setSelectedMenu('dashboard')}>
          <FaTachometerAlt /> Dashboard
      </MenuItem>
      <MenuItem onClick={() => setSelectedMenu('data')}>
          <FaDatabase /> Conectar Data
      </MenuItem>
      <MenuItem onClick={() => setSelectedMenu('automation')}>
          <FaRobot /> Automatizado
      </MenuItem>
  </SidebarWrapper>
  );
};
export default CPanelSidebar;
