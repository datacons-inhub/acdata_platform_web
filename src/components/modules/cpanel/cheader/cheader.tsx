import React, { useState } from 'react';
import { FaSun, FaMoon, FaSearch, FaBell, FaCog, FaRobot, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { HeaderWrapper, SearchBar, QuickActions, AccountButton, AccountDropdown, MenuButton, LogoText } from './cheader.styles';

interface ClientHeaderProps {
  toggleTheme: () => void;
  theme: string;
  toggleMenu: () => void;
}

const ClientHeader: React.FC<ClientHeaderProps> = ({ toggleTheme, theme, toggleMenu }) => {
  const [isAccountMenuOpen, setAccountMenuOpen] = useState(false);

  const toggleAccountMenu = () => {
    setAccountMenuOpen(!isAccountMenuOpen);
  };

  return (
    <HeaderWrapper>
      {/* Botón de Menú */}
      <MenuButton onClick={toggleMenu} aria-label="Abrir menú">
        <span className="menu-icon">&#9776;</span>
      </MenuButton>
      <LogoText>InHub</LogoText>


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
