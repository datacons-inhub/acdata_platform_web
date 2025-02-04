// src/components/Body/HomeBody.tsx
import React from 'react';
import styles from './HomeBody.module.css';
import SlideShow from '../SlideShow/SlideShow';

const HomeBody: React.FC = () => {
  return (
    <main className={styles.body}>
      <SlideShow images={[
        '/src/assets/images/presentacion.png',
        '/src/assets/images/datos_conectados.png',
        '/src/assets/images/maximizar_eficiencia.png'
      ]} />
    </main>
  );
};

export default HomeBody;
