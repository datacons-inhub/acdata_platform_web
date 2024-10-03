import styled from 'styled-components';

export const SignUpContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100vh;
  padding: 2rem;
  background-color: ${(props) => props.theme.bodyBackground};
  color: ${(props) => props.theme.textColor};
`;

export const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
`;

export const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Input = styled.input`
  padding: 1rem;
  font-size: 1rem;
  border: 1px solid ${(props) => props.theme.inputBorder};
  border-radius: 5px;
`;

export const Button = styled.button`
  padding: 1rem;
  background-color: #2ecc71;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
`;

interface OAuthButtonProps {
  bgColor?: string;
  color?: string;
}

export const OAuthButton = styled.button<OAuthButtonProps>`
  padding: 1rem;
  background-color: ${(props) => props.bgColor || '#fff'};
  color: ${(props) => props.color || '#000'};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1rem 0;
  
  ::before,
  ::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid ${(props) => props.theme.inputBorder};
  }

  ::before {
    margin-right: 1rem;
  }

  ::after {
    margin-left: 1rem;
  }
`;
