import { Link } from 'react-router-dom';
import CarCard from '../components/CarCard';
import NavBar from '../components/NavBar';
import '../App.css';
import carrosData from '../assets/carros.json';

// Define types for the Carro object
interface Carro {
  marca: string;
  modelo: string;
  matricula: string;
  eventos: Record<string, string>; // keys are event names, values are ISO date strings
  cor_rgb: number[];
  data_fabrico: string;
  imagem_url: string;
  quilometragem: number; // also added the kilometers field
}

function HomePage() {
  const carros: Carro[] = carrosData.carros;

  return (
    <div className='px-3'>
        <h1 className="text-2xl font-light text-left text-black">Welcome,</h1>
        <h1 className="text-4xl font-extrabold text-left text-black mb-3">
          {localStorage.getItem('username') || 'Guest'}
        </h1>
      <div className="h-[650px] overflow-y-scroll">

        {/* List of cars */}
        {carros.map((carro, index) => (
          <Link key={index} to={`/car-details/${carro.matricula}`}>
            <CarCard carro={carro} />
          </Link>
        ))}
      </div>

      <NavBar />
    </div>
  );
}

export default HomePage;

