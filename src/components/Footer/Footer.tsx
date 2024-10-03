//import React from 'react';
import { FooterWrapper, FooterTop, FooterLinks, SocialMedia, Copyright, SocialIcon } from './Footer.styles';
import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <FooterWrapper>
      {/* Parte superior del footer */}
      <FooterTop>
        <p>Conectando tu PyME con IA avanzada</p>
      </FooterTop>

      {/* Redes sociales */}
      <SocialMedia>
        <SocialIcon href="https://facebook.com" target="_blank">
          <FaFacebookF />
        </SocialIcon>
        <SocialIcon href="https://linkedin.com" target="_blank">
          <FaLinkedinIn />
        </SocialIcon>
        <SocialIcon href="https://twitter.com" target="_blank">
          <FaTwitter />
        </SocialIcon>
      </SocialMedia>

      {/* Enlaces de la plataforma */}
      <FooterLinks>
        <a href="/terms">Términos y Condiciones</a>
        <a href="/privacy">Política de Privacidad</a>
        <a href="/support">Soporte</a>
      </FooterLinks>

      {/* Derechos de autor */}
      <Copyright>
        <p>&copy; {new Date().getFullYear()} InHub. Todos los derechos reservados.</p>
      </Copyright>
    </FooterWrapper>
  );
};

export default Footer;
