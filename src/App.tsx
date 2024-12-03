import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme as mainLightTheme, darkTheme as mainDarkTheme } from './styles/theme';  // Tema de la página principal
import { GlobalStyles } from './styles/GlobalStyles';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Body from './components/Body/Body';
//import { AuthProvider } from './context/AuthContext';
import ControlPanel from './components/modules/cpanel/ControlPanel';
import SignUpModal from './components/modules/account/SignUpModal';

const App = () => {
  // Estado para el tema de la página principal
  const [mainTheme, setMainTheme] = useState('light');

  // Función para cambiar el tema de la página principal
  const toggleMainTheme = () => {
    setMainTheme(mainTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <Routes>
        {/* Página Principal */}
        <Route
          path="/"
          element={
            <ThemeProvider theme={mainTheme === 'light' ? mainLightTheme : mainDarkTheme}>
              <GlobalStyles />
              <Header toggleTheme={toggleMainTheme} theme={mainTheme} />
              <Body />
              <Footer />
            </ThemeProvider>
          }
        />

        {/* Panel del Cliente */}
        <Route
          path="/client-cpanel"
          element={
            <ThemeProvider theme={mainTheme === 'light' ? mainLightTheme : mainDarkTheme}>
              <GlobalStyles />
              <AuthProvider>
                <ControlPanel toggleTheme={toggleMainTheme} theme={mainTheme} />
              </AuthProvider>
                

              
            </ThemeProvider>
          }
        />
        <Route path="/signup" element={<SignUpModal />} />
      </Routes>
    </Router>
  );
};

export default App;
