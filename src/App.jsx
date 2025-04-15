// App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Appointments from './screens/Appointments';
import CarDetails from './screens/CarDetails';
import Home from './screens/Home';
import Map from './screens/Map';
import Profile from './screens/Profile';

export default function App() {
  return (
      <Router>
        <div className="p-4">

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Appointments" element={<Appointments />} />
            <Route path="/CarDetails" element={<CarDetails />} />
            <Route path="/Map" element={<Map />} />
            <Route path="/Profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
  );
}
