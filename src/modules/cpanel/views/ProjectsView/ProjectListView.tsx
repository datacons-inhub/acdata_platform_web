// src/modules/cpanel/views/ProjectsView/ProjectListView.tsx
import React, { useState } from 'react';
import styles from './ProjectListView.module.css';
import { PencilIcon, TrashIcon, PlusIcon, ChevronUpIcon, ChevronDownIcon, MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import ConfirmModal from '../DataConnectionsView/ConfirmModal'; // reutilizamos modal de confirmación
import { useGlobalContext } from "../../context/GlobalContext";
import { useProjects } from '../../hooks/useProjects';
//import { CreateNewProjectModal } from "../../components/CreateNewProjectModal";

type SortField = 'name'|'created_at';
type SortOrder = 'asc'|'desc';

const ITEMS_PER_PAGE = 15;

interface ProjectListViewProps {
  onCreate: () => void;
  onEdit: (projectId:string) => void;
}

const ProjectListView: React.FC<ProjectListViewProps> = ({onCreate,onEdit}) => {

  const { userId } = useGlobalContext(); // Obtengo el UserId del contexto global (Usuario logueado)
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [deleteId, setDeleteId] = useState<string|null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { projects, isLoading, isError, error, deleteProject } = useProjects();


  const applyFilters = () => {
    let result = projects ? [...projects] : [];
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term));
    }
    result.sort((a,b)=>{
      const valA = (sortField==='created_at') ? new Date(a.created_at).getTime() : a[sortField];
      const valB = (sortField==='created_at') ? new Date(b.created_at).getTime() : b[sortField];
      if (valA<valB) return sortOrder==='asc'?-1:1;
      if (valA>valB) return sortOrder==='asc'?1:-1;
      return 0;
    });
    return result;
  };

  const filteredProjects = applyFilters();

  const totalItems = filteredProjects.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1)*ITEMS_PER_PAGE;
  const pageProjects = filteredProjects.slice(startIndex,startIndex+ITEMS_PER_PAGE);
  const canPrev = currentPage>1;
  const canNext = currentPage<totalPages;

  const handleSort = (field:SortField) => {
    if (sortField===field) {
      setSortOrder(sortOrder==='asc'?'desc':'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  const handlePrev = () => { if(canPrev) setCurrentPage(currentPage-1); };
  const handleNext = () => { if(canNext) setCurrentPage(currentPage+1); };

  const handleDeleteConfirm = (projectId:string) => { setDeleteId(projectId); };
  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteProject(deleteId);
      setDeleteId(null);
    } catch (error) {
      console.error("Failed to delete project:", error);
    }

  };

  return (

    
    <div className={styles.container}>
      {deleteId && (
        <ConfirmModal
          message="¿Estás seguro de eliminar este proyecto?"
          onConfirm={handleDelete}
          onCancel={()=>setDeleteId(null)}
        />
      )}
      <div className={styles.header}>
        <h2 className={styles.title}>Listado de Proyectos</h2>
        <h1>userId: {userId} </h1>
        <button className={styles.createBtn} onClick={onCreate}>
          <PlusIcon className={styles.icon}/> Nuevo
        </button>


      </div>

      {isLoading && <div className={styles.message}>Cargando...</div>}
      {isError && !isLoading && <div className={styles.message}>Error: {(error as Error)?.message}</div>}

      {!isLoading && !isError && (
        <>
          <div className={styles.filterBar}>
            <div className={styles.searchBox}>
              <MagnifyingGlassIcon className={styles.searchIcon}/>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Buscar por nombre o descripción"
                value={searchTerm}
                onChange={e=>{setSearchTerm(e.target.value);setCurrentPage(1);}}
              />
            </div>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.projectTable}>
              <thead>
                <tr>
                  <th onClick={()=>handleSort('name')}>
                    Nombre {sortField==='name' && (sortOrder==='asc'?<ChevronUpIcon className={styles.sortIcon}/>:<ChevronDownIcon className={styles.sortIcon}/>)}
                  </th>
                  <th>Tipo</th>
                  
                  <th onClick={()=>handleSort('created_at')}>
                    Fecha Creación {sortField==='created_at' && (sortOrder==='asc'?<ChevronUpIcon className={styles.sortIcon}/>:<ChevronDownIcon className={styles.sortIcon}/>)}
                  </th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pageProjects.map(p=>(
                  <tr key={p._id}>
                    <td>
                      <div className={styles.projectName}>{p.name}</div>
                      <div className={styles.projectSubtext}>{p.description}</div>
                    </td>
                    <td>{p.type}</td>
                    
                    <td>{new Date(p.created_at).toLocaleString()}</td>
                    <td>
                      <button className={styles.actionBtn} onClick={()=>onEdit(p._id)} title="Editar">
                        <PencilIcon className={styles.actionIcon}/>
                      </button>
                      <button className={styles.actionBtn} onClick={()=>handleDeleteConfirm(p._id)} title="Eliminar">
                        <TrashIcon className={styles.actionIcon}/>
                      </button>
                    </td>
                  </tr>
                ))}
                {pageProjects.length===0 && (
                  <tr>
                    <td colSpan={5} style={{textAlign:'center',color:'var(--color-text)'}}>No hay proyectos que coincidan con el filtro.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalItems > ITEMS_PER_PAGE && (
            <div className={styles.pagination}>
              <span className={styles.paginationInfo}>
                Mostrando {startIndex+1}-{Math.min(startIndex+ITEMS_PER_PAGE, totalItems)} de {totalItems}
              </span>
              <div className={styles.paginationControls}>
                <button className={styles.pageBtn} onClick={handlePrev} disabled={!canPrev}>
                  <ChevronLeftIcon className={styles.pageIcon}/> Anterior
                </button>
                <button className={styles.pageBtn} onClick={handleNext} disabled={!canNext}>
                  Siguiente <ChevronRightIcon className={styles.pageIcon}/>
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProjectListView;