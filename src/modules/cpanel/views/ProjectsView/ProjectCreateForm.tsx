// src/modules/cpanel/views/ProjectsView/ProjectCreateForm.tsx
import React, { useState } from 'react';
import styles from './ProjectCreateForm.module.css';
import { useGlobalContext } from "../../context/GlobalContext";
import { useProjects } from '../../hooks/useProjects';  

interface ProjectCreateFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

const ProjectCreateForm: React.FC<ProjectCreateFormProps> = ({onCancel,onSuccess}) => {

  const { userId } = useGlobalContext(); // Obtengo el UserId del contexto global (Usuario logueado)

  const [name, setName] = useState('');
  const [description,setDescription] = useState('');
  const [type,setType] = useState('general');
  const [user_id, setUserId] = useState(userId); //
  const [message,setMessage] = useState<string|null>(null);
  const [loading,setLoading] = useState(false);

  const { createProject } = useProjects();

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    if(!name.trim()) {
      setMessage('El nombre es requerido');
      return;
    }
    if(!description.trim()) {
      setMessage('La descripción es requerida');
      return;
    }
    try {
      setLoading(true);
      setMessage(null);
      await createProject({name,description,type,user_id});
      onSuccess();
    } catch(err:any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Crear Proyecto</h2>
      {message && <div className={styles.message}>{message}</div>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label}>Nombre *</label>
          <input type="text" className={styles.input} value={name} onChange={e=>setName(e.target.value)}/>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Descripción *</label>
          <textarea className={styles.input} value={description} onChange={e=>setDescription(e.target.value)} />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Tipo</label>
          <select className={styles.select} value={type} onChange={e=>setType(e.target.value)}>
            <option value="general">General</option>
            <option value="data">Data</option>
            <option value="ml">Machine Learning</option>
          </select>
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.cancelBtn} onClick={onCancel}>Cancelar</button>
          <button type="submit" className={styles.saveBtn} disabled={loading}>Guardar</button>
        </div>
      </form>
    </div>
  );
};

export default ProjectCreateForm;