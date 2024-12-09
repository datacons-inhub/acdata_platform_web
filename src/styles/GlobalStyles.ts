import { createGlobalStyle, css } from 'styled-components';

export const fontFamilies = {
  body: "'Open Sans', sans-serif",
  heading: "'Montserrat', sans-serif",
  footer: "'Roboto', sans-serif",
  cta: "'Lato', sans-serif",
};

export const GlobalStyles = createGlobalStyle`
  ${({ theme }) => css`
    body {
      transition: background-color 0.3s, color 0.3s;
    }

    body.light {
      font-family: ${fontFamilies.body};
      background-color: ${theme?.light?.background || '#fff'};
      color: ${theme?.light?.text || '#000'};
      margin: 0;
      padding: 0;
    }

    body.dark {
      font-family: ${fontFamilies.body};
      background-color: ${theme?.dark?.background || '#000'};
      color: ${theme?.dark?.text || '#fff'};
      margin: 0;
      padding: 0;
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: ${fontFamilies.heading};
      color: ${({ theme }) => theme?.primary || '#000'};
    }

    p {
      line-height: 1.6;
    }

    footer {
      font-family: ${fontFamilies.footer};
      font-size: 0.875rem;
      color: ${({ theme }) => theme?.secondary || '#444'};
    }

    .cta-btn {
      font-family: ${fontFamilies.cta};
      font-weight: bold;
    }

    .container {
      display: flex;
      justify-content: space-between;
      padding: 2rem;
    }

    .left-column {
      width: 50%;
      padding: 2rem;
    }

    .right-column {
      width: 50%;
      padding: 2rem;
    }
  `}
`;