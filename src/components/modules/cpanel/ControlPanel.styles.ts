// Dashboard.styles.ts
import styled from 'styled-components';

export const DashboardWrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  margin-top: 80px; /* Asegura que el contenido no esté cubierto por el header */
`;

export const MainContent = styled.div`
  flex-grow: 1;
  padding: 2rem;
  background-color: ${({ theme }) => theme.bodyBackground};
  color: ${({ theme }) => theme.text};
  overflow-y: auto;

`;


