import styled from 'styled-components';

export const DataCardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    background-color: ${({ theme }) => theme.bodyBackground};
    color: ${({ theme }) => theme.bodyText};

    h2 {
        font-family: 'Montserrat', sans-serif;
        color: ${({ theme }) => theme.primaryText};
        margin-bottom: 1.5rem;
    }

    .integration-cards {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 2rem;
    }
`;

export const IntegrationCard = styled.div`
    background-color: ${({ theme }) => theme.cardBackground};
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.2s;

    &:hover {
        transform: translateY(-5px);
    }

    img {
        width: 40px;
        height: 40px;
        margin-bottom: 1rem;
    }

    .details {
        h3 {
            font-family: 'Open Sans', sans-serif;
            color: ${({ theme }) => theme.primaryText};
        }

        .actions {
            display: flex;
            justify-content: space-around;
            margin-top: 1rem;
        }
    }
`;

export const IntegrationButton = styled.button<{ variant: 'read' | 'write' }>`
    background-color: ${({ variant, theme }) =>
        variant === 'read' ? theme.readButtonBackground : theme.writeButtonBackground};
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    font-family: 'Lato', sans-serif;
    font-size: 14px;

    &:hover {
        background-color: ${({ variant, theme }) =>
            variant === 'read' ? theme.readButtonHover : theme.writeButtonHover};
    }
`;
