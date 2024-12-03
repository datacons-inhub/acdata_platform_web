import styled from 'styled-components';

export const BodyWrapper = styled.div`
  padding: 2rem;
  transition: background-color 0.3s ease;
  background-color: ${({ theme }) => theme.bodyBackground};
  color: ${({ theme }) => theme.bodyText};
  min-height: calc(80vh - 80px); /* Ajusta la altura según el tamaño del header */
  
`;
