import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//Global Styles y localStorage
import { GlobalStyles } from './styles/GlobalStyles';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
// Interfaces
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Body from './components/Body/Body';
import ControlPanel from './components/modules/cpanel/ControlPanel';
import SignUpModal from './components/modules/account/SignUpModal';


const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        {/* Página Principal */}
        <Route
          path="/"
          element={
            <ThemeProvider>
              <GlobalStyles />
              <Header />
              <Body />
              <Footer />
            </ThemeProvider>
          }
        />

        {/* Panel del Cliente */}
        <Route
          path="/client-cpanel"
          element={
            <ThemeProvider>            
              <GlobalStyles />
              <AuthProvider>
                <ControlPanel />
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
