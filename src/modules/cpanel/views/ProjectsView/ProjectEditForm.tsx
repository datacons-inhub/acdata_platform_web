// src/modules/cpanel/views/ProjectsView/ProjectEditForm.tsx

import React, { memo, useEffect, useState, useRef } from 'react';
import styles from './ProjectCreateForm.module.css'; // Podemos reutilizar mismos estilos
import { useProjects } from '../../hooks/useProjects'; // Importamos useProjects


interface ProjectEditFormProps {
  projectId: string;
  onCancel: () => void;
  onSuccess: () => void;
}

//const ProjectEditForm: React.FC<ProjectEditFormProps> = ({ projectId, onCancel, onSuccess }) => {
  const ProjectEditForm: React.FC<ProjectEditFormProps> = memo(({ projectId, onCancel, onSuccess }) => {

  //const ProjectEditForm = memo(({ projectId, onCancel, onSuccess }) => {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('general');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const { fetchProjectDetail, updateProject } = useProjects();
  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;  // Si ya corrió, no vuelve a correr.
    didRun.current = true;
    async function fetchData() {
      try {
        setMessage(null);
        const project = await fetchProjectDetail(projectId);
        setName(project.name);
        setDescription(project.description);
        setType(project.type);
      } catch (err: any) {
        setMessage(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [projectId, fetchProjectDetail]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Evitar recarga de la página

    if (!name.trim()) {
      setMessage('El nombre es requerido');
      return;
    }

    if (!description.trim()) {
      setMessage('La descripción es requerida');
      return;
    }

    try {
      setLoading(true);
      setMessage(null);
      await updateProject({ projectId, data: { name, description, type } });
      onSuccess();
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className={styles.container}>Cargando...</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Editar Proyecto</h2>
      {message && <div className={styles.message}>{message}</div>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label}>Nombre *</label>
          <input
            type="text"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Descripción *</label>
          <textarea
            className={styles.input}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Tipo</label>
          <select
            className={styles.select}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="general">General</option>
            <option value="data">Data</option>
            <option value="ml">Machine Learning</option>
          </select>
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.cancelBtn} onClick={onCancel}>
            Cancelar
          </button>
          <button type="submit" className={styles.saveBtn} disabled={loading}>
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}
  );

export default ProjectEditForm;