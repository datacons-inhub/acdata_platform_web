// src/modules/cpanel/views/DataConnectionsView/FileListView.tsx
import React, { useCallback, useEffect, useState } from 'react';
import styles from './FileListView.module.css';
//import { listFiles, deleteFile, FileRecord } from '../../ser//vices/fileService';
import { PencilIcon, TrashIcon, MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import ConfirmModal from './ConfirmModal'; // Reutilizamos el modal
import logger from '../../../../services/logger';
import { useFiles, FileRecord } from '../../hooks/useFiles';

interface FileListViewProps {
  dbType: string;
  onBack: () => void;
}

type SortField = 'filename'|'upload_date';
type SortOrder = 'asc'|'desc';

const ITEMS_PER_PAGE = 20;

const FileListView: React.FC<FileListViewProps> = ({ dbType, onBack }) => {

  const { allFiles, deleteFile } = useFiles();

  const [files, setFiles] = useState<FileRecord[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<FileRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('filename');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string|null>(null);
  const [deleteId, setDeleteId] = useState<string|null>(null);

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    try {
      setLoading(true);
      setMessage(null);
      if (allFiles) {
        setFiles(allFiles);
        setFilteredFiles(allFiles);
      }
    } catch (err:any) {
      logger.error(err.message);
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [allFiles]);

  const extractType = (contentType: string): string => {
    const parts = contentType.split('/');
    return parts[parts.length - 1];
  };
  
  const applyFilters = useCallback(() => {
    let result = [...files];
  
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(f => f.filename.toLowerCase().includes(term) || extractType(f.content_type).includes(term));
    }
  
    result.sort((a, b) => {
      const valA = (sortField === 'upload_date') ? new Date(a.upload_date).getTime() : a[sortField];
      const valB = (sortField === 'upload_date') ? new Date(b.upload_date).getTime() : b[sortField];
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  
    setFilteredFiles(result);
    setCurrentPage(1);
  }, [searchTerm, sortField, sortOrder, files]);
  
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleSort = (field: SortField) => {
    if (sortField===field) {
      setSortOrder(sortOrder==='asc'?'desc':'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleDeleteConfirm = (fileId:string) => {
    setDeleteId(fileId);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      setMessage(null);
      const response = await deleteFile(deleteId);
      if (!response.success) {
        throw new Error(response.error?.msg || 'Error al eliminar archivo');
      }
      setFiles(files.filter(f=>f._id!==deleteId));
      setDeleteId(null);
    } catch (err:any) {
      logger.error(err.message);
      setMessage(`Error: ${err.message}`);
    }
  };

  // Paginación lógica
  const totalItems = filteredFiles.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1)*ITEMS_PER_PAGE;
  const pageFiles = filteredFiles.slice(startIndex, startIndex+ITEMS_PER_PAGE);

  const canPrev = currentPage>1;
  const canNext = currentPage<totalPages;

  const handlePrev = () => {
    if(canPrev) setCurrentPage(currentPage-1);
  };
  const handleNext = () => {
    if(canNext) setCurrentPage(currentPage+1);
  };

  return (
    <div className={styles.container}>
      {deleteId && (
        <ConfirmModal
          message="¿Estás seguro de eliminar este archivo?"
          onConfirm={handleDelete}
          onCancel={()=>setDeleteId(null)}
        />
      )}

      <div className={styles.header}>
        <button className={styles.backBtn} onClick={onBack}>
          ← Volver
        </button>
        <h2 className={styles.title}>Archivos - {dbType.toUpperCase()}</h2>
      </div>

      {loading && <div className={styles.message}>Cargando...</div>}
      {message && !loading && <div className={styles.message}>{message}</div>}

      {!loading && !message && (
        <>
          <div className={styles.filterBar}>
            <div className={styles.searchBox}>
              <MagnifyingGlassIcon className={styles.searchIcon}/>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Filtrar por Nombre o Tipo"
                value={searchTerm}
                onChange={e=>setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.fileTable}>
              <thead>
                <tr>
                  <th onClick={()=>handleSort('filename')}>
                    Nombre {sortField==='filename' && (sortOrder==='asc'?<ChevronUpIcon className={styles.sortIcon}/>:<ChevronDownIcon className={styles.sortIcon}/>)}
                  </th>
                  <th>Tipo</th>
                  <th onClick={()=>handleSort('upload_date')}>
                    Subido {sortField==='upload_date' && (sortOrder==='asc'?<ChevronUpIcon className={styles.sortIcon}/>:<ChevronDownIcon className={styles.sortIcon}/>)}
                  </th>
                  <th>Tamaño</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pageFiles.map((f)=> {
                  const tipo = extractType(f.content_type).toUpperCase();
                  return (
                    <tr key={f._id}>
                      <td>
                        <div className={styles.fileName}>{f.filename}</div>
                        <div className={styles.fileSubtext}>{f.storage_path}</div>
                      </td>
                      <td>{tipo}</td>
                      <td>{new Date(f.upload_date).toLocaleString()}</td>
                      <td>{(f.size/1024).toFixed(2)} KB</td>
                      <td>
                        <button className={styles.actionBtn} onClick={()=>handleDeleteConfirm(f._id)} title="Eliminar">
                          <TrashIcon className={styles.actionIcon}/>
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {pageFiles.length===0 && (
                  <tr>
                    <td colSpan={5} style={{textAlign:'center',color:'var(--color-text)'}}>No hay archivos que coincidan con el filtro.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalItems > ITEMS_PER_PAGE && (
            <div className={styles.pagination}>
              <span className={styles.paginationInfo}>
                Mostrando {startIndex+1}-{Math.min(startIndex+ITEMS_PER_PAGE,totalItems)} de {totalItems}
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

export default FileListView;
