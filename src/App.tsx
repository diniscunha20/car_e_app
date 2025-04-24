// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './screens/LoginPage'
import HomePage from './screens/HomePage'
import CarInfo from './screens/CarInfo'
import User from './screens/User'
import MapPage from './screens/MapPage'
import RegisterPage from './screens/RegisterPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/perfil" element={<User />} />
        <Route path="/car" element={<CarInfo />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </Router>
  );
}

export default App;
