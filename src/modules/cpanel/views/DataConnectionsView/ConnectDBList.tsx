// src/modules/cpanel/views/DataConnectionsView/ConnectDBList.tsx
import React from 'react';
import styles from './ConnectDBList.module.css';
import csvJsonIcon from '../../../../assets/cpanel/data/txt.svg';
import awsS3Icon from '../../../../assets/cpanel/data/s3-bucket.svg';
import mysqlIcon from '../../../../assets/cpanel/data/mysql.svg';
import postgresqlIcon from '../../../../assets/cpanel/data/postgresql.svg';
import bigquery from '../../../../assets/cpanel/data/google-bigquery.svg';
import adls from '../../../../assets/cpanel/data/storage-date-lake-storage.svg';
import oracle from '../../../../assets/cpanel/data/oracle.svg';
import { EyeIcon, LinkIcon } from '@heroicons/react/24/outline';

// Lista de conexiones disponibles (podrían venir de una config externa)
const connections = [
  { key: 'csvjson', name: 'CSV | JSON', icon: csvJsonIcon },
  { key: 'postgres', name: 'PostgresSql', icon: postgresqlIcon },
  { key: 'bigquery', name: 'BigQuery', icon: bigquery },
  { key: 'mysql', name: 'MySql', icon: mysqlIcon },
  { key: 's3', name: 'S3 Storage', icon: awsS3Icon },
  { key: 'adls', name: 'ADLS Gen2', icon: adls },
  { key: 'oracle', name: 'Oracle', icon: oracle }
];


interface ConnectDBListProps {
  onSelect: (dbType: string) => void;
  onView: (dbType: string) => void;
}

const ConnectDBList: React.FC<ConnectDBListProps> = ({ onSelect, onView }) => {
  return (
    <div className={styles.listContainer}>
      <h2 className={styles.title}>Seleccionar el tipo de Conexión</h2>
      <div className={styles.grid}>
        {connections.map(conn => (
          <div key={conn.key} className={styles.card}>
            <img src={conn.icon} alt={conn.name} className={styles.dbIcon} />
            <span className={styles.dbName}>{conn.name}</span>
            <div className={styles.btnGroup}>
              <button className={`${styles.actionBtn} ${styles.viewBtn}`} onClick={() => onView(conn.key)}>
                <EyeIcon className={styles.btnIcon}/> Ver
              </button>
              <button className={`${styles.actionBtn} ${styles.connectBtn}`} onClick={() => onSelect(conn.key)}>
                <LinkIcon className={styles.btnIcon}/> Conectar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectDBList;