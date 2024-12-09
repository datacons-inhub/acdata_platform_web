// AddData.tsx
import React, { useState, useRef } from 'react';
import { uploadFiles } from '../../../../../../services/fileService'; 
import './AddDataView.css';

interface AddDataProps {
  connectionType: string;
  onCancel: () => void;
}

interface FileItem {
  file: File;
  progress: number;
  uploaded: boolean;
  error: boolean;
}

 // Supongamos que obtenemos userId y projectId de algún contexto o props
 const userId = 1; // Reemplazar con el valor real
 const projectId =  '6716cebd65b9f23a3802f4ac'; // Reemplazar con el valor real


const AddData: React.FC<AddDataProps> = ({ connectionType, onCancel }) => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFiles = (selectedFiles: FileList) => {
    const newFiles: FileItem[] = [];
    const fileNames = files.map((fileItem) => fileItem.file.name);
    let totalSize = files.reduce((acc, fileItem) => acc + fileItem.file.size, 0);

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];

      // Validación de tipo de archivo
      const validTypes = ['application/json', 'text/csv'];
      if (!validTypes.includes(file.type)) {
        alert(`El archivo ${file.name} no es un CSV o JSON válido.`);
        continue;
      }

      // Validación de tamaño de archivo individual
      if (file.size > 2 * 1024 * 1024) {
        alert(`El archivo ${file.name} excede el tamaño máximo de 2 MB.`);
        continue;
      }

      // Validación de archivo duplicado
      if (fileNames.includes(file.name)) {
        alert(`El archivo ${file.name} ya ha sido agregado.`);
        continue;
      }

      // Validación de tamaño total
      totalSize += file.size;
      if (totalSize > 2 * 1024 * 1024) {
        alert('El tamaño total de los archivos excede los 2 MB.');
        break;
      }

      newFiles.push({
        file,
        progress: 0,
        uploaded: false,
        error: false,
      });
    }

    if (newFiles.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleDeleteFile = (fileName: string) => {
    setFiles((prevFiles) => prevFiles.filter((fileItem) => fileItem.file.name !== fileName));
  };

  const handleBackClick = () => {
    if (window.confirm('¿Está seguro de cancelar la conexión o carga?')) {
      onCancel();
    }
  };

  const uploadFile = (fileItem: FileItem) => {
    // Simulación de carga de archivo
    const simulateUpload = () => {
      return new Promise<void>((resolve, reject) => {
        const totalSteps = 100;
        let currentStep = 0;

        const interval = setInterval(() => {
          currentStep += 1;
          const progress = (currentStep / totalSteps) * 100;

          setFiles((prevFiles) =>
            prevFiles.map((item) =>
              item.file.name === fileItem.file.name ? { ...item, progress } : item
            )
          );

          if (currentStep >= totalSteps) {
            clearInterval(interval);
            resolve();
          }
        }, 30);
      });
    };

    simulateUpload()
      .then(() => {
        setFiles((prevFiles) =>
          prevFiles.map((item) =>
            item.file.name === fileItem.file.name ? { ...item, uploaded: true } : item
          )
        );
      })
      .catch(() => {
        setFiles((prevFiles) =>
          prevFiles.map((item) =>
            item.file.name === fileItem.file.name ? { ...item, error: true } : item
          )
        );
      });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const fileList = files.map((fileItem) => fileItem.file);

    try {
      const data = await uploadFiles(userId, projectId, fileList);
      alert(data.message || 'Archivos cargados exitosamente.');
      console.log('data file', data);
    } catch (error) {
      alert(`Error al cargar los archivos.${error.message}`);
    }
  };
  /*const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    files.forEach((fileItem) => {
      if (!fileItem.uploaded && !fileItem.error) {
        uploadFile(fileItem);
      }
    });
  };*/

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="add-data">
      <div className="add-data-header">
        <button className="back-button" onClick={handleBackClick}>
          ← Regresar
        </button>
        <br></br>
        <h2>Agregar datos - {connectionType}</h2>
      </div>
      <form onSubmit={handleSubmit} className="upload-form">
        
        <div
          className={`upload-area ${dragActive ? 'drag-active' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={onButtonClick}
        >
          <p>Arrastra y suelta tus archivos aquí o haz clic para seleccionarlos</p>
          <input
            type="file"
            multiple
            accept=".csv, application/json"
            ref={inputRef}
            onChange={handleChange}
            style={{ display: 'none' }}
          />
        </div>
        {files.length > 0 && (
          <div className="file-list">
            <ul>
              {files.map((fileItem) => (
                <li key={fileItem.file.name} className="file-item">
                  <div className="file-info">
                    <span className="file-name">{fileItem.file.name}</span>
                    <span className="file-size">
                      {(fileItem.file.size / 1024).toFixed(2)} KB
                    </span>
                  </div>
                  <div className="file-actions">
                    {!fileItem.uploaded && !fileItem.error && (
                      <button
                        type="button"
                        className="delete-file-button"
                        onClick={() => handleDeleteFile(fileItem.file.name)}
                      >
                        &times;
                      </button>
                    )}
                  </div>
                  <div className="progress-bar">
                    <div
                      className={`progress-fill ${
                        fileItem.error ? 'error' : fileItem.uploaded ? 'uploaded' : ''
                      }`}
                      style={{ width: `${fileItem.progress}%` }}
                    ></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {files.some((fileItem) => !fileItem.uploaded && !fileItem.error) && (
          <div className="submit-section">
            {/*<button type="submit" className="submit-button">
              Cargar Archivos
            </button>*/}
            
      {/* ... resto del formulario ... */}
      <button type="submit">Cargar Archivos</button>


          </div>
        )}
      </form>
    </div>
  );
};

export default AddData;
