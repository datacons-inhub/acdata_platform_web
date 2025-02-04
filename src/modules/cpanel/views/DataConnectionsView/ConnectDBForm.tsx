// src/modules/cpanel/views/DataConnectionsView/ConnectDBForm.tsx
import React from 'react';
import styles from './ConnectDBForm.module.css';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface ConnectDBFormProps {
  dbType: string;
  onBack: () => void;
}

const ConnectDBForm: React.FC<ConnectDBFormProps> = ({ dbType, onBack }) => {
  return (
    <div className={styles.formContainer}>
      <button className={styles.backBtn} onClick={onBack} aria-label="Volver">
        <ArrowLeftIcon className={styles.backIcon} /> Volver
      </button>
      <h2 className={styles.title}>Conectar con {dbType.toUpperCase()}</h2>
      
      {/* Ejemplo de interfaz, podría ser un form de credenciales o drag&drop files */}
      <div className={styles.uploadSection}>
        <div className={styles.dropArea}>
          <p className={styles.dropText}>Arrastra archivos aquí o</p>
          <button className={styles.uploadBtn}>Seleccionar archivo</button>
        </div>
        <div className={styles.uploadingList}>
          {/* Simular archivos subidos */}
          <div className={styles.fileItem}>
            <span className={styles.fileName}>data.csv (2mb)</span>
            <div className={styles.progressContainer}>
              <div className={styles.progressBar} style={{width: '65%'}}></div>
              <span className={styles.progressText}>65% done</span>
            </div>
          </div>
          {/* Cuando termine, se puede mostrar "Completado" */}
        </div>
      </div>
    </div>
  );
};

export default ConnectDBForm;
