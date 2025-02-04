// src/modules/cpanel/views/DataConnectionsView/FileUploadView.tsx
import React, { useState, useRef } from 'react';
import styles from './FileUploadView.module.css';
import { ArrowLeftIcon, XMarkIcon, DocumentArrowUpIcon, TrashIcon } from '@heroicons/react/24/outline';


import logger from '../../../../services/logger';
import ConfirmModal from './ConfirmModal';
import { uploadFiles } from '../../services/fileService';

interface FileUploadViewProps {
  dbType: string;
  onBack: () => void;
}

const ALLOWED_EXTENSIONS = ['csv','json','xml'];
const MAX_FILES = 5;
const MAX_TOTAL_SIZE = 2 * 1024 * 1024 * 1024; // 2GB

const FileUploadView: React.FC<FileUploadViewProps> = ({ dbType, onBack }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState<string|null>(null);
  const inputRef = useRef<HTMLInputElement|null>(null);

  const validateFile = (file: File): boolean => {
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!ext || !ALLOWED_EXTENSIONS.includes(ext)) return false;
    if (file.name.length > 150) return false;
    if (files.some(f => f.name === file.name && f.size === file.size)) return false;
    return true;
  };

  const handleFiles = (newFiles: FileList) => {
    const updated = [...files];
    for (let i=0; i<newFiles.length; i++){
      const file = newFiles[i];
      if (!validateFile(file)) {
        logger.error(`Archivo inválido o no permitido: ${file.name}`);
        continue; 
      }
      if (updated.length >= MAX_FILES) {
        logger.error('Máximo 5 archivos.');
        break;
      }
      updated.push(file);
    }
    const totalSize = updated.reduce((acc, f) => acc + f.size, 0);
    if (totalSize > MAX_TOTAL_SIZE) {
      logger.error('El total supera los 2GB.');
      return;
    }
    setFiles(updated);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  const removeFile = (index: number) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
  };

  const handleBackClick = () => {
    if (files.length > 0) setShowConfirm(true);
    else onBack();
  };

  const confirmBack = (confirm: boolean) => {
    setShowConfirm(false);
    if (confirm) onBack();
  };

  const handleUpload = async () => {
    try {
      setMessage(null);
      const response = await uploadFiles(1, '6716cebd65b9f23a3802f4ac', files);
      if (!response.success) {
        throw new Error(response.error?.msg || 'Error al subir archivos');
      }
      setMessage('Archivos subidos con éxito.');
      setFiles([]);
    } catch (err: any) {
      logger.error(err.message);
      setMessage(`Error: ${err.message}`);
    }
  };

  const triggerFileSelect = () => inputRef.current?.click();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFiles(e.target.files);
  };

  return (
    <div className={styles.container}>
      {showConfirm && (
        <ConfirmModal
          message="¿Estás seguro de salir?"
          onConfirm={() => confirmBack(true)}
          onCancel={() => confirmBack(false)}
        />
      )}
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={handleBackClick}>
          <ArrowLeftIcon className={styles.icon}/> Volver
        </button>
        <h2 className={styles.title}>Cargar archivos {dbType.toUpperCase()}</h2>
      </div>

      <div className={styles.dropArea} onDragOver={handleDragOver} onDrop={handleDrop}>
        <DocumentArrowUpIcon className={styles.dropIcon}/>
        <p className={styles.dropText}>Arrastra archivos aquí o Click en el botón.</p>
        <p className={styles.dropText}>Soporta archivos de texto (JSON) y separado por comas (CSV).</p>
        <button className={styles.selectBtn} onClick={triggerFileSelect}>Seleccionar archivos</button>
        <input
          ref={inputRef}
          type="file"
          multiple
          style={{display:'none'}}
          onChange={handleInputChange}
        />
      </div>

      <div className={styles.fileList}>
        {files.map((file, index) => (
          <div className={styles.fileItem} key={index}>
            <span className={styles.fileName}>{file.name} ({Math.round(file.size/1024)}KB)</span>
            <button className={styles.removeBtn} onClick={() => removeFile(index)} title="Eliminar">
              <XMarkIcon className={styles.removeIcon}/>
            </button>
          </div>
        ))}
      </div>

      <button className={styles.uploadBtn} onClick={handleUpload} disabled={files.length === 0}>Cargar</button>

      {message && <div className={styles.message}>{message}</div>}
    </div>
  );
};

export default FileUploadView;