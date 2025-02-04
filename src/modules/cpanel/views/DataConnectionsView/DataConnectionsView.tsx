// src/modules/cpanel/views/DataConnectionsView/DataConnectionsView.tsx
import React, { useState } from 'react';
import ConnectDBList from './ConnectDBList';
import ConnectDBForm from './ConnectDBForm';
import FileUploadView from './FileUploadView';
import FileListView from './FileListView'; // Nuevo componente

const DataConnectionsView: React.FC = () => {
  const [selectedDB, setSelectedDB] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list'|'form'|'upload'|'view'>('list');

  const handleSelectDB = (dbType: string) => {
    if (dbType === 'csvjson') {
      // Conectar CSV/JSON abre FileUploadView
      setSelectedDB(dbType);
      setViewMode('upload');
    } else {
      setSelectedDB(dbType);
      setViewMode('form');
    }
  };

  const handleViewDB = (dbType: string) => {
    if (dbType === 'csvjson') {
      // Ver CSV/JSON abre FileListView
      setSelectedDB(dbType);
      setViewMode('view');
    } else {
      console.log(`Ver detalles de: ${dbType}`);
      // Podría abrir otro modal o vista si se requiere en el futuro
    }
  };

  const handleBack = () => {
    setViewMode('list');
    setSelectedDB(null);
  };

  return (
    <div style={{padding: '20px'}}>
      {viewMode === 'list' && (
        <ConnectDBList onSelect={handleSelectDB} onView={handleViewDB} />
      )}
      {viewMode === 'form' && selectedDB && (
        <ConnectDBForm dbType={selectedDB} onBack={handleBack} />
      )}
      {viewMode === 'upload' && selectedDB && (
        <FileUploadView dbType={selectedDB} onBack={handleBack} />
      )}
      {viewMode === 'view' && selectedDB && (
        <FileListView dbType={selectedDB} onBack={handleBack} />
      )}
    </div>
  );
};

export default DataConnectionsView;
