// DataConnectionView.tsx
import React, { useState } from 'react';
import './DataConnectionView.css';
import { dataConnections } from './dataConnections';
import AddData from './AddDataView';

const DataConnectionView: React.FC = () => {
  const [selectedConnection, setSelectedConnection] = useState<string | null>(null);

  const handleSelectConnection = (connectionType: string) => {
    setSelectedConnection(connectionType);
  };

  const handleCancel = () => {
    setSelectedConnection(null);
  };

  return (
    <div className="data-connection-view">
      {selectedConnection ? (
        <AddData connectionType={selectedConnection} onCancel={handleCancel} />
      ) : (
        <>
          <h2>Seleccione una conexión de datos</h2>
          <div className="connection-grid">
            {dataConnections.map((connection) => (
              <div
                key={connection.name}
                className="connection-card"
                onClick={() => handleSelectConnection(connection.name)}
              >
                
                <img src= {connection.icon} alt={connection.name} className="connection-icon" />
                <span>{connection.displayName}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DataConnectionView;
