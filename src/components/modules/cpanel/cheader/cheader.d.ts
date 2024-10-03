import React from 'react';
interface ClientHeaderProps {
    toggleTheme: () => void;
    theme: string;
    toggleMenu: () => void;
}
declare const ClientHeader: React.FC<ClientHeaderProps>;
export default ClientHeader;
