// src/modules/cpanel/views/ProjectsView/ProjectsView.tsx
import React, { useState } from 'react';
import ProjectListView from './ProjectListView';
import ProjectCreateForm from './ProjectCreateForm';
import ProjectEditForm from './ProjectEditForm';

type ViewMode = 'list'|'create'|'edit';

const ProjectsView: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [editProjectId, setEditProjectId] = useState<string|null>(null);

  const handleCreate = () => { setViewMode('create');  };
  const handleCreated = () => { setViewMode('list');  };
  const handleBackToList = () => { setViewMode('list'); setEditProjectId(null);  };
  const handleEdit = (projectId:string) => { setEditProjectId(projectId); setViewMode('edit');  };

  return (
    <div style={{padding:'20px'}}>
      {viewMode === 'list' && <ProjectListView onCreate={handleCreate} onEdit={handleEdit} />}
      {viewMode === 'create' && <ProjectCreateForm onCancel={handleBackToList} onSuccess={handleCreated}/>}
      {viewMode === 'edit' && editProjectId && <ProjectEditForm projectId={editProjectId} onCancel={handleBackToList} onSuccess={handleBackToList}/>}

    </div>
  );
};

export default ProjectsView;
