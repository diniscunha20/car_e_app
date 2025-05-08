// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './screens/LoginPage'
import HomePage from './screens/HomePage'
import User from './screens/User'
import MapPage from './screens/MapPage'
import RegisterPage from './screens/RegisterPage'
import CarDetails from './screens/CarDetails'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/perfil" element={<User />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/car-details/:matricula" element={<CarDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
