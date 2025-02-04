// src/modules/cpanel/pages/CPanelPage.tsx
import React, { useEffect, useRef, useState } from 'react';
import CPanelLayout from '../CPanelLayout';
import { authenticate } from '../services/authService';
import { syncUser } from '../services/userService';
import logger from '../../../services/logger';

const CPanelPage: React.FC = () => {
  const [syncData, setSyncData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;  // Si ya corrió, no vuelve a correr.
    didRun.current = true;

    async function init() {

      try {
        await authenticate();
        const data = await syncUser(1); // user_id=1 hardcoded
        setSyncData(data);

      } catch (err: any) {
        logger.error(err instanceof Error ? err.message : 'Unknown error');
        setError(err instanceof Error ? err.message : 'Unexpected error');
      }
    }
    init();
  }, []);

  return <CPanelLayout syncData={syncData} error={error} />;
};

export default CPanelPage;
