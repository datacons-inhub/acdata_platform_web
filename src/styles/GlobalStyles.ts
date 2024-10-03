import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Open Sans', sans-serif;
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
    margin: 0;
    padding: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Montserrat', sans-serif;
    color: ${(props) => props.theme.primary};
  }

  p {
    font-family: 'Open Sans', sans-serif;
    line-height: 1.6;
  }

  footer {
    font-family: 'Roboto', sans-serif;
    font-size: 0.875rem;
    color: ${(props) => props.theme.secondary};
  }

  .cta-btn {
    font-family: 'Lato', sans-serif;
    font-weight: bold;
  }

// Slider Sign Up
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
`;


