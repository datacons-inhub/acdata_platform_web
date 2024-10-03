// src/components/ClientDashboard/ClientFooter.styles.ts
import styled from 'styled-components';

export const FooterWrapper = styled.footer`
  text-align: center;
  padding: 1rem;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  position: absolute;
  bottom: 0;
  width: 100%;
`;
