import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CarCard from '../components/CarCard';
import NavBar from '../components/NavBar';
import '../App.css';
import carrosData from '../assets/carros.json';
import OficinasData from '../assets/oficinas.json'
import { Carro,Oficina } from '../assets/Props';

function HomePage() {
  const [carros, setCarros] = useState<Carro[]>([]);
  const [oficinas, setOficinas] = useState<Oficina[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('carros');
    if (stored) {
      console.log(JSON.parse(stored))
      setCarros(JSON.parse(stored));
    } else {
      // Store the JSON data in localStorage on first load
      localStorage.setItem('carros', JSON.stringify(carrosData.carros));
      setCarros(carrosData.carros);
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('oficinas');
    if (stored) {
      console.log("oficinas:",JSON.parse(stored))
      setOficinas(JSON.parse(stored));
    } else {
      localStorage.setItem('oficinas', JSON.stringify(OficinasData.oficinas));
      setOficinas(OficinasData.oficinas);
    }
  }, []);

  return (
    <div className='h-full px-3'>
      <div className='h-[83%]'>
        <h1 className="text-2xl font-light text-left text-black">Welcome,</h1>
        <h1 className="text-4xl font-extrabold text-left text-black mb-3">
          {localStorage.getItem('username') || 'Guest'}
        </h1>

        <div className="h-full fix-top overflow-y-scroll">
          {carros.map((carro, index) => (
            <Link key={index} to={`/car-details/${carro.matricula}`}>
              <CarCard carro={carro} />
            </Link>
          ))}
        </div>
      </div>

      <NavBar />
    </div>
  );
}

export default HomePage;
