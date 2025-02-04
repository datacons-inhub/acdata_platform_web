// src/components/ThemeToggle/ThemeToggle.tsx
import React, { useContext } from 'react';
import { ThemeContext } from '../../state/ThemeContext';
import styles from './ThemeToggle.module.css';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button className={styles.toggleBtn} onClick={toggleTheme}>
      {theme === 'light' ? '🌞' : '🌜'}
    </button>
  );
};

export default ThemeToggle;