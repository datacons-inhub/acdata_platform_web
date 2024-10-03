import React from 'react';
interface HeaderProps {
    toggleTheme: () => void;
    theme: string;
}
declare const Header: React.FC<HeaderProps>;
export default Header;
