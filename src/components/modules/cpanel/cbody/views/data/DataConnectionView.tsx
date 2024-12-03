import React, { useState } from 'react';
import CPanelBody from '../../cbody';

import imgFirebase from '@assets/images/cpanel/data/firebase.png';
import { DataCardWrapper, IntegrationCard, IntegrationButton, UploadSection, FileList, FileItem, RemoveButton, AddButton, Modal, ModalContent, ModalActions } from './DataConnectionView.styles';

const dataSources = [
  { name: 'CSV', icon: imgFirebase },
  { name: 'JSON', icon: imgFirebase },
  { name: 'Firebase', icon: imgFirebase },
  { name: 'Firebase', icon: imgFirebase },
  { name: 'Firebase', icon: imgFirebase },
  { name: 'Firebase', icon: imgFirebase },
  // Agrega más opciones según sea necesario
];

const DataConnectionView: React.FC = () => {
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleSelectSource = (source: string) => {
    if (selectedSources.length < 5 && !selectedSources.includes(source)) {
      setSelectedSources([...selectedSources, source]);
    }
  };

  const handleDeselectSource = (source: string) => {
    setSelectedSources(selectedSources.filter((s) => s !== source));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []);
    const validFiles = newFiles.filter((file) => {
      const isValidType = file.type === 'application/json' || file.type === 'text/csv';
      const isValidSize = file.size <= 2 * 1024 * 1024; // 2 MB
      const isUnique = !files.some((f) => f.name === file.name);
      return isValidType && isValidSize && isUnique;
    });
    setFiles([...files, ...validFiles]);
  };

  const handleRemoveFile = (fileName: string) => {
    setFiles(files.filter((file) => file.name !== fileName));
  };

  const handleCancel = () => {
    setShowModal(true);
  };

  const confirmCancel = () => {
    setSelectedSources([]);
    setFiles([]);
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <CPanelBody>
      <DataCardWrapper>
        {selectedSources.length === 0 ? (
          <>
            <h2>Seleccione la opción adecuada para la conexión a su Base de Datos</h2>
            <div className="integration-cards">
              {dataSources.map((source) => (
                <IntegrationCard key={source.name}>
                  <img src={source.icon} alt={`${source.name} icon`} />
                  <div className="details">
                    <h3>{source.name}</h3>
                    <div className="actions">
                      <IntegrationButton variant="read" onClick={() => handleSelectSource(source.name)}>
                        Seleccionar
                      </IntegrationButton>
                    </div>
                  </div>
                </IntegrationCard>
              ))}
            </div>
          </>
        ) : (
          <UploadSection>
            <h3>Cargar datos desde las siguientes fuentes:</h3>
            <ul>
              {selectedSources.map((source) => (
                <li key={source}>
                  {source}
                  <IntegrationButton variant="read" onClick={() => handleDeselectSource(source)}>
                    Eliminar
                  </IntegrationButton>
                </li>
              ))}
            </ul>
            <FileList>
              {files.map((file) => (
                <FileItem key={file.name}>
                  {file.name} ({(file.size / 1024).toFixed(2)} KB)
                  <RemoveButton onClick={() => handleRemoveFile(file.name)}>Eliminar</RemoveButton>
                </FileItem>
              ))}
            </FileList>
            <input type="file" accept=".csv,application/json" multiple onChange={handleFileChange} />
            <AddButton>+</AddButton>
            <IntegrationButton variant="read" onClick={handleCancel}>
              Volver
            </IntegrationButton>
          </UploadSection>
        )}
      </DataCardWrapper>
      {showModal && (
        <Modal>
          <ModalContent>
            <h3>¿Está seguro de cancelar la conexión o carga?</h3>
            <ModalActions>
              <IntegrationButton variant="read" onClick={confirmCancel}>
                Sí
              </IntegrationButton>
              <IntegrationButton variant="read" onClick={closeModal}>
                No
              </IntegrationButton>
            </ModalActions>
          </ModalContent>
        </Modal>
      )}
    </CPanelBody>
  );
};

export default DataConnectionView;