import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  z-index: 1000;
  position: fixed;
  width: 100%;
  top: 0;
`;
/*
export const LogoWrapper = styled.div`
  h1 {
    font-family: 'Montserrat', sans-serif;
    font-size: 20px;    
    color: ${({ theme }) => theme.primaryText};
  }
`;*/

export const SearchBar = styled.div`
  display: flex;
  input {
    padding: 0.5rem;
    margin-right: 0.5rem;
    font-size: 16px;
    border: 1px solid ${({ theme }) => theme.secondary};
    background-color: ${({ theme }) => theme.inputBackground};
    color: ${({ theme }) => theme.inputText};
  }
  button {
    background-color: ${({ theme }) => theme.secondary};
    color: #fff;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
  }
`;

export const QuickActions = styled.div`
  display: flex;
  gap: 1rem;

  svg {
    color: ${({ theme }) => theme.iconColor};
    font-size: 20px;
  }
`;

export const ThemeToggleButton = styled.button`
  background-color: ${({ theme }) => theme.toggleBackground};
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: #fff;
`;


export const AccountButton = styled.div`
  position: relative;
  cursor: pointer;
`;

export const AccountDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: ${({ theme }) => theme.body};
  padding: 0.5rem;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0,0,0,0.1);
  z-index: 9999;
  
  a {
    display: block;
    padding: 0.5rem;
    color: ${({ theme }) => theme.primaryText};
    text-decoration: none;
    &:hover {
      background-color: ${({ theme }) => theme.secondary};
      color: #fff;
    }
  }
`;

export const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: ${({ theme }) => theme.text}; // Cambia de color según el tema

  padding: 0 1rem;
  
  &:hover {
    color: ${({ theme }) => theme.text};
  }
`;
export const LogoText = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  font-size: 24px; // Tamaño ajustable
  color: ${({ theme }) => theme.primaryText}; // Cambia de color según el tema
  margin: 0;  /* Elimina márgenes para un mejor centrado */  
`;
