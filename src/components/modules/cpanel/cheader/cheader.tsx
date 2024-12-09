import React, { useEffect, useState } from 'react';
import { FaSun, FaMoon, FaSearch, FaBell, FaCog, FaRobot, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { HeaderWrapper, SearchBar, QuickActions, AccountButton, AccountDropdown, MenuButton, LogoText } from './cheader.styles';
import logger from '../../../../utils/logger';
import { syncUser } from '../../../../services/syncService';
import { useAuth } from '../../../../context/AuthContext';
import { useTheme } from '../../../../context/ThemeContext';

interface ClientHeaderProps {
  toggleMenu: () => void;
}

//const ClientHeader: React.FC = () => {
const ClientHeader: React.FC<ClientHeaderProps> = ({ toggleMenu }) => { 
  const { theme, toggleTheme } = useTheme();
//const ClientHeader: React.FC<ClientHeaderProps> = ({ toggleTheme, theme, toggleMenu }) => {
  const [isAccountMenuOpen, setAccountMenuOpen] = useState(false);

  const toggleAccountMenu = () => {
    setAccountMenuOpen(!isAccountMenuOpen);
  };
  const { user, isAuthenticated, login: authLogin } = useAuth();
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

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

  return (
    <HeaderWrapper>
      {/* Botón de Menú */}
      <MenuButton onClick={toggleMenu} aria-label="Abrir menú">
        <span className="menu-icon">&#9776;</span>
      </MenuButton>
      <LogoText>InHub | </LogoText>
      {syncMessage && <div>{syncMessage}</div>}

      {/* Barra de Búsqueda */}
      <SearchBar>
        <input type="text" placeholder="Buscar en el Panel..." />
        <button><FaSearch size={18} /></button>
        <button className="ia-button"><FaRobot size={18} /> IA</button>
      </SearchBar>

      {/* Acciones rápidas */}
      <QuickActions>
        <FaBell size={20} className="icon" />
        <FaCog size={20} className="icon" />
      </QuickActions>

      {/* Botón de cambio de Tema */}
      <button onClick={toggleTheme}>
        {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
      </button>

      {/* Botón de cuenta del usuario */}
      <AccountButton onClick={toggleAccountMenu}>
        <FaUserCircle size={20} />
        {isAccountMenuOpen && (
          <AccountDropdown>
            <a href="/account">Ver información de la cuenta</a>
            <a href="/logout">Cerrar sesión</a>
            <a href="/login">Iniciar sesión con otra cuenta</a>
          </AccountDropdown>
        )}
      </AccountButton>

      {/* Botón de salir */}
      <button onClick={() => window.location.href = "/"}>
        <FaSignOutAlt size={20} />
        </button>




    </HeaderWrapper>
  );
};

export default ClientHeader;
