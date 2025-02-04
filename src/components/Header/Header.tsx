// src/components/Header/Header.tsx
import React, { useContext, useState } from 'react';
import styles from './Header.module.css';
import { ThemeContext } from '../../state/ThemeContext';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className={styles.header}>
      <div className={styles.logoSection}>
        <img src="/src/assets/logo.png" alt="acdata logo" className={styles.logo}/>
        <span className={styles.title}>acdata</span>
      </div>
      
      <button className={styles.menuBtn} onClick={toggleMenu} aria-label="Toggle menu">
        <span className={styles.hamburger}></span>
        <span className={styles.hamburger}></span>
        <span className={styles.hamburger}></span>
      </button>
      
      <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
        <a href="#nosotros" className={styles.link}>Nosotros</a>
        <a href="#proyectos" className={styles.link}>Proyectos</a>
        {/* Reemplazamos href="#demo" por Link a /cpanel */}
        <Link to="/cpanel" className={`${styles.link} ${styles.linkCta}`}>Demo</Link>
        <a href="#login" className={styles.link}>Login</a>
        <a href="#registro" className={`${styles.link} ${styles.linkCta}`}>Registro</a>
      </nav>
      
      <ThemeToggle />
    </header>
  );
};

export default Header;