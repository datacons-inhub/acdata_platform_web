import React from 'react';
interface CPanelSidebarProps {
    menuOpen: boolean;
    setSelectedMenu: (menu: string) => void;
}
declare const CPanelSidebar: React.FC<CPanelSidebarProps>;
export default CPanelSidebar;
