import styled from 'styled-components';

export const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 2rem;
  background-color: ${({ theme }) => theme.background};
`;

export const PresentationSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.primaryBackground};
  padding: 2rem;
  border-radius: 12px;
  
  img {
    width: 40%;
    border-radius: 8px;
  }

  div {
    width: 50%;
    text-align: left;
    
    h1 {
      font-size: 2.5rem;
      color: ${({ theme }) => theme.primaryText};
    }
    
    p {
      font-size: 1.2rem;
      color: ${({ theme }) => theme.secondaryText};
    }
    
    button {
      background-color: ${({ theme }) => theme.ctaBackground};
      color: ${({ theme }) => theme.ctaText};
      padding: 1rem 2rem;
      font-size: 1rem;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;

    img, div {
      width: 100%;
    }
  }
`;

export const FeatureSection = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const Feature = styled.div`
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
  text-align: center;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    border-radius: 8px;
  }

  h3 {
    margin: 1rem 0;
    color: ${({ theme }) => theme.primaryText};
  }

  p {
    color: ${({ theme }) => theme.secondaryText};
  }
`;

export const TestimonialSection = styled.div`
  background-color: ${({ theme }) => theme.lightBackground};
  padding: 2rem;
  text-align: center;
  border-radius: 12px;

  h2 {
    font-size: 2rem;
    color: ${({ theme }) => theme.primaryText};
  }

  p {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.secondaryText};
  }
`;
