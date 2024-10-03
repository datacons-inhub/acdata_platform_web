//import React from 'react';
import { BodyWrapper, PresentationSection, FeatureSection, Feature, TestimonialSection } from './Body.styles';
import presentationImage from '@assets/images/body/presentacion.png'; // Agrega una imagen representativa
import featureImage1 from '@assets/images/body/datos_conectados.png';
import featureImage2 from '@assets/images/body/maximizar_eficiencia.png';
import featureImage3 from '@assets/images/body/maximizar_eficiencia.png';

const Body = () => {
  return (
    <BodyWrapper>
      {/* Sección 1: Presentación Impactante */}
      <PresentationSection>
        <img src={presentationImage} alt="Presentación IA" />
        <div>
          <h1>Automatiza tus decisiones con la inteligencia artificial más avanzada</h1>
          <p>Con nuestra plataforma puedes personalizar y automatizar procesos empresariales con IA.</p>
          <button>Prueba ahora</button>
        </div>
      </PresentationSection>

      {/* Sección 2: Ventajas Clave */}
      <FeatureSection>
        <Feature>
          <img src={featureImage1} alt="Transfiere tus decisiones" />
          <h3>Transfiere tus decisiones</h3>
          <p>Con una plataforma de IA totalmente personalizable.</p>
        </Feature>
        <Feature>
          <img src={featureImage2} alt="Personaliza tu PyME" />
          <h3>Personaliza tu PyME</h3>
          <p>Automatiza decisiones usando IA.</p>
        </Feature>
        <Feature>
          <img src={featureImage3} alt="Automatiza tus decisiones" />
          <h3>Automatiza tus decisiones</h3>
          <p>Genera resultados inmediatos con IA avanzada.</p>
        </Feature>
      </FeatureSection>

      {/* Sección 3: Testimonios */}
      <TestimonialSection>
        <h2>Lo que nuestros usuarios dicen</h2>
        <p>"Gracias a InHub, hemos optimizado nuestras operaciones en un 50% usando su IA personalizada."</p>
        <p>- Empresa X</p>
      </TestimonialSection>
    </BodyWrapper>
  );
};

export default Body;
