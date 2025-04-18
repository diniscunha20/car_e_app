// App.tsx
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './screens/LoginPage'
import HomePage from './screens/HomePage'
import CarInfo from './screens/CarInfo'
import User from './screens/User'
import Map from './screens/Map'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/perfil" element={<User />} />
        <Route path="/car" element={<CarInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
