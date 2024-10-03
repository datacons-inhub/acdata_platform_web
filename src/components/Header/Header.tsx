import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '@assets/logos/logo.png'; 
import { HeaderWrapper, NavMenu, LogoText, LogoWrapper, ButtonGroup } from './Header.styles';
import { FaSun, FaMoon } from 'react-icons/fa';


interface HeaderProps {
  toggleTheme: () => void;  // Definir el tipo para toggleTheme
  theme: string;  // Definir el tipo para theme
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, theme }) => {  // Definir el tipo del componente
  
  const navigate = useNavigate(); // Definimos useNavigate para redirigir
  const handleSignup = () => {
    navigate('/cpanel');
  };
  const handleLogin = () => {
    navigate('/signup');
  };

  return (
    <HeaderWrapper>
      <LogoWrapper>
        <img src={logo} alt="Inhub Logo" />
        <LogoText>InHub</LogoText>
      </LogoWrapper>
      <NavMenu>
        <Link to="/" >Inicio</Link>
        <Link to="/products">Servicios</Link>
        <Link to="/use_case">Casos</Link>
        <Link to="/resources">Recursos</Link>
        <Link to="/price">Precios</Link>
        <Link to="/support">Soporte</Link>
        <Link to="/about_us">Nosotros</Link>
      </NavMenu>
      <ButtonGroup>
        <button className="cta-btn" onClick={handleSignup} >Demo</button>
        <button className="cta-btn secondary" onClick={handleLogin} >Login free</button>
        <button onClick={toggleTheme}>
          {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
        </button>
      </ButtonGroup>
      </HeaderWrapper>
  );
};

export default Header;