// src/modules/cpanel/components/MainContent/MainContent.tsx
import React from 'react';
import styles from './MainContent.module.css';
import DashboardsView from '../../views/DashboardsView/DashboardsView';
import DataConnectionsView from '../../views/DataConnectionsView/DataConnectionsView';
import ProjectsView from '../../views/ProjectsView/ProjectsView';

interface MainContentProps {
  sidebarOpen: boolean;
  selectedOption: string;
}

const viewComponents: Record<string, React.FC> = {
  dashboards: DashboardsView,
  //procesamiento: ProcesamientoView,
  conectar: DataConnectionsView, // Nuevo
  proyectos: ProjectsView,
  // ...
};

const MainContent: React.FC<MainContentProps> = ({ sidebarOpen, selectedOption }) => {
  const ViewComponent = viewComponents[selectedOption] || DashboardsView;

  return (
    <main className={`${styles.main} ${sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
      <ViewComponent />
    </main>
  );
};

export default MainContent;
/*
const MainContent: React.FC<MainContentProps> = ({ sidebarOpen, selectedOption }) => {
  let content;
  switch (selectedOption) {
    case 'cuenta':
      content = <p>Información de la cuenta</p>;
      break;
    case 'conectar':
      content = <p>Conectando a la base de datos...</p>;
      break;
    case 'procesamiento':
      content = <p>Herramientas de procesamiento de datos</p>;
      break;
    case 'proyectos':
      content = <p>Listado de proyectos</p>;
      break;
    case 'modelamiento':
      content = <p>Opciones de modelamiento</p>;
      break;
    case 'dashboards':
    default:
      content = <p>Visualización de dashboards</p>;
      break;
  }

  return (
    <main className={`${styles.main} ${sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
      {content}
    </main>
  );
};

export default MainContent;*/
