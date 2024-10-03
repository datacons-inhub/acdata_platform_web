import styled from 'styled-components';

export const PresentationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;

  img {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
  }

  @media (max-width: 768px) {
    margin: 1rem 0;
  }
`;
