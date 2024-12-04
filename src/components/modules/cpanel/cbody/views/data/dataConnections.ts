
import csvJsonIcon from '@assets/images/cpanel/data/csv-json-icon.png';
import awsS3Icon from '@assets/images/cpanel/data/s3-icon.png';
import mysqlIcon from '@assets/images/cpanel/data/mysql-icon.png';
import postgresqlIcon from '@assets/images/cpanel/data/postgresql-icon.png';

// dataConnections.ts
export const dataConnections = [
  {
    name: 'csv-json',
    displayName: 'Archivos',
    icon: csvJsonIcon,
  },
  {
    name: 's3',
    displayName: 'Aws S3',
    icon: awsS3Icon,
  },
  {
    name: 'mysql',
    displayName: 'MySQL',
    icon: mysqlIcon,
  },
  {
    name: 'postgresql',
    displayName: 'PostgreSQL',
    icon: postgresqlIcon,
  },
  // Agregar más conexiones según sea necesario
];