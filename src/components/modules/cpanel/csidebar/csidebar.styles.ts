import styled from 'styled-components';

export const SidebarWrapper = styled.nav.withConfig({
  shouldForwardProp: (prop) => prop !== 'isOpen',
})<{ isOpen: boolean }>`
  width: ${({ isOpen }) => (isOpen ? '200px' : '0')};
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  height: 100vh;
  transition: width 0.3s;
  overflow: hidden;
`;

export const MenuItem = styled.div`
  padding: 1rem;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1rem;
  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
`;
