//import React from 'react';
import { PresentationWrapper } from './Presentation.styles';
import presentationImage from '@assets/images/body/presentacion.png'; // Imagen de presentación

const Presentation = () => {
  return (
    <PresentationWrapper>
      <img src={presentationImage} alt="Presentación" />
    </PresentationWrapper>
  );
};

export default Presentation;
