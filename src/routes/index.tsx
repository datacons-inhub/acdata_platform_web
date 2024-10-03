
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../components/Body/Body'; // Actualiza según corresponda

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Otras rutas */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
