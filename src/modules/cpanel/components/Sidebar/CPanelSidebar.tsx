// src/modules/cpanel/components/Sidebar/CPanelSidebar.tsx
import React from 'react';
import styles from './CPanelSidebar.module.css';
import { UserIcon, ServerStackIcon, CpuChipIcon, FolderIcon, CubeTransparentIcon, ChartBarIcon } from '@heroicons/react/24/outline';

interface CPanelSidebarProps {
  isOpen: boolean;
  selectedOption: string;
  onSelectOption: (opt: any) => void;
}

const CPanelSidebar: React.FC<CPanelSidebarProps> = ({ isOpen, selectedOption, onSelectOption }) => {
  const options = [
    { key: 'cuenta', label: 'Cuenta', icon: <UserIcon className={styles.icon}/> },
    { key: 'conectar', label: 'Conecte su Data', icon: <ServerStackIcon className={styles.icon}/> },
    { key: 'procesamiento', label: 'Procesamiento', icon: <CpuChipIcon className={styles.icon}/> },
    { key: 'proyectos', label: 'Proyectos', icon: <FolderIcon className={styles.icon}/> },
    { key: 'modelamiento', label: 'Modelamiento', icon: <CubeTransparentIcon className={styles.icon}/> },
    { key: 'dashboards', label: 'Dashboards', icon: <ChartBarIcon className={styles.icon}/> }
  ];

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <nav className={styles.menu}>
        {options.map(opt => (
          <button
            key={opt.key}
            className={`${styles.menuItem} ${selectedOption === opt.key ? styles.active : ''}`}
            onClick={() => onSelectOption(opt.key)} >            
            {opt.icon} {isOpen && <span>{opt.label}</span>}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default CPanelSidebar;
