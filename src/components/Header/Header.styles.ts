import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${(props) => props.theme.headerBackground};
  border-bottom: 2px solid ${(props) => props.theme.primary};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start; /* Alinea a la izquierda en pantallas pequeñas */
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center; /* Centrado vertical */
  gap: 1rem; /* Espacio entre logo y texto */
  
  img {
    height: 120px; /* Tamaño del logo ajustable */
  }
`;
export const LogoText = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  font-size: 36px; // Tamaño ajustable
  color: ${({ theme }) => theme.primaryText}; // Cambia de color según el tema
  margin: 0;  /* Elimina márgenes para un mejor centrado */  
`;

export const NavMenu = styled.nav`
  display: flex;
  gap: 2rem;
  font-family: 'Montserrat', sans-serif;

  a {
    text-decoration: none;
    color: ${(props) => props.theme.text};
    font-size: 20px;  // Tamaño de texto para pantallas grandes

    &:hover {
      color: ${(props) => props.theme.primary};
    }
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }  
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  .cta-btn {
    background-color: #2ecc71;  // Verde menta para contrastar
    border: none;
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    font-family: 'Lato', sans-serif;
    font-size: 18px;  // Aumentamos también el tamaño de los botones
    cursor: pointer;
    &:hover {
      background-color: #27ae60;
    }
  }

  .cta-btn.secondary {
    background-color: ${(props) => props.theme.background};
    border: 2px solid #2ecc71;
    color: #2ecc71;
    &:hover {
      background-color: #2ecc71;
      color: #fff;
    }
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    color: ${(props) => props.theme.text};
    &:hover {
      color: ${(props) => props.theme.primary};
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
