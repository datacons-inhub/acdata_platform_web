// src/modules/cpanel/components/Header/CPanelHeader.tsx
import React, { useState } from 'react';
import ThemeToggle from '../../../../components/ThemeToggle/ThemeToggle';
import styles from './CPanelHeader.module.css';
import { Bars3Icon, MagnifyingGlassIcon, Cog8ToothIcon, UserCircleIcon, ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline';

import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/authService';

interface CPanelHeaderProps {
  onToggleSidebar: () => void;
  title: string;
  syncData?: any;
  error?: string | null;
  onOptionChange: (option: string) => void;
}

const CPanelHeader: React.FC<CPanelHeaderProps> = ({ onToggleSidebar, title, syncData, error }) => {
  //const { theme } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <button className={styles.iconBtn} onClick={onToggleSidebar} aria-label="Toggle Sidebar">
        <Bars3Icon className={styles.icon}/>
      </button>
      <h1 className={styles.title}>
        {title} {syncData ? ` - ${syncData.message || 'Sync OK'}` : ''}
      </h1>
      {error && <span className={styles.error}>Error: {error}</span>}
      <div className={styles.searchContainer}>
        <MagnifyingGlassIcon className={styles.searchIcon}/>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <button className={styles.iconBtn} aria-label="Settings">
        <Cog8ToothIcon className={styles.icon}/>
      </button>
      <ThemeToggle />

        <button className={styles.iconBtn} onClick={() => setAccountMenuOpen(!accountMenuOpen)}>
          <UserCircleIcon className={styles.icon}/>
        </button>

        <button className={styles.iconBtn} onClick={handleLogout} aria-label="Logout" title="Salir">
        <ArrowRightEndOnRectangleIcon className={styles.icon} />
      </button>


    </header>
  );
};

export default CPanelHeader;