// src/modules/cpanel/views/DataConnectionsView/ConfirmModal.tsx
import React from 'react';
import styles from './ConfirmModal.module.css';

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p className={styles.modalText}>{message}</p>
        <div className={styles.btnGroup}>
          <button className={`${styles.modalBtn} ${styles.confirmBtn}`} onClick={onConfirm}>Sí</button>
          <button className={`${styles.modalBtn} ${styles.cancelBtn}`} onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
