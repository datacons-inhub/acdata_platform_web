// src/components/Footer/Footer.tsx
import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <span className={styles.text}>Síguenos: </span>
      <a href="https://twitter.com" target="_blank" rel="noreferrer" className={styles.link}>Twitter</a>
      <a href="https://facebook.com" target="_blank" rel="noreferrer" className={styles.link}>Facebook</a>
      <a href="https://linkedin.com" target="_blank" rel="noreferrer" className={styles.link}>LinkedIn</a>
    </footer>
  );
};

export default Footer;
