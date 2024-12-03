import { ReactNode } from 'react';
import { BodyWrapper } from './cbody.styles';

interface CPBodyProps {
    children: ReactNode;  
  }
  
  const CPBody = ({ children }: CPBodyProps) => {
    return (


    <BodyWrapper style={{ flex: 1 }}>
      {children}
    </BodyWrapper>
  );
};

export default CPBody;
