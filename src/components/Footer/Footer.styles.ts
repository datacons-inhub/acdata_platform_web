import styled from 'styled-components';

export const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.footerBackground};
  color: ${({ theme }) => theme.footerText};
  padding: 3rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

export const FooterTop = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.footerText};
`;

export const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;

  a {
    color: ${({ theme }) => theme.footerText};
    text-decoration: none;
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;

    &:hover {
      color: ${({ theme }) => theme.primary};
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const SocialMedia = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

export const SocialIcon = styled.a`
  font-size: 24px;
  color: ${({ theme }) => theme.footerText};

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

export const Copyright = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  color: ${({ theme }) => theme.footerText};

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;
