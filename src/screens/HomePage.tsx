import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CarCard from '../components/CarCard';
import NavBar from '../components/NavBar';
import AddCarModal from '../components/AddCarModal';
import '../App.css';
import carrosData from '../assets/carros.json';
import OficinasData from '../assets/oficinas.json';
import { Carro, Oficina } from '../assets/Props';

function HomePage() {
  const [carros, setCarros] = useState<Carro[]>([]);
  const [oficinas, setOficinas] = useState<Oficina[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('carros');
    if (stored) {
      setCarros(JSON.parse(stored));
    } else {
      localStorage.setItem('carros', JSON.stringify(carrosData.carros));
      setCarros(carrosData.carros);
    }
  }, [showModal]); // re-render list when modal closes and updates storage

  useEffect(() => {
    const stored = localStorage.getItem('oficinas');
    if (stored) {
      setOficinas(JSON.parse(stored));
    } else {
      localStorage.setItem('oficinas', JSON.stringify(OficinasData.oficinas));
      setOficinas(OficinasData.oficinas);
    }
  }, []);

  return (
    <div className='h-full px-3 mt-2'>
      <h1 className="text-2xl font-light text-left text-black">Welcome,</h1>
      <h1 className="text-4xl font-extrabold text-left text-black mb-3">
        {localStorage.getItem('username') || 'Guest'}
      </h1>

      <div className="h-full pb-40"> {/* leave space for NavBar */}
        {carros.map((carro, index) => (
          <Link key={index} to={`/car-details/${carro.matricula}`}>
            <CarCard carro={carro}/>
          </Link>
        ))}
      </div>

      {/* Add Button */}
      <button
        className="fixed bottom-20 right-4 z-50 h-10 w-15 bg-stone-900 text-[#F8F8E0] text-3xl rounded-full shadow-xl hover:bg-stone-800 transition border-2"
        onClick={() => setShowModal(true)}
      >
        +
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-40 bg-black/70 flex justify-center items-center">
          <div className="relative z-50">
            <button
              className="absolute top-2 right-2 text-xl text-white font-bold bg-red-600 rounded-full w-8 h-8"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <AddCarModal />
          </div>
        </div>
      )}

      <NavBar />
    </div>
  );
}

export default HomePage;
