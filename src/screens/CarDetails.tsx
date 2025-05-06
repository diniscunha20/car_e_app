import React from 'react';
import { useParams } from 'react-router-dom';
import carrosData from '../assets/carros.json';
import NavBar from '../components/NavBar';
import "../assets/css/CarCard.css"



// Define types for the Carro object
interface Carro {
  marca: string;
  modelo: string;
  matricula: string;
  eventos: string[];
  cor_rgb: number[];
  data_fabrico: string;
  imagem_url: string;
}

const CarDetails: React.FC = () => {
  const { matricula } = useParams<{ matricula: string }>(); // Get matricula from URL

  // Find the car based on matricula
  const carro = carrosData.carros.find((car) => car.matricula === matricula);

  if (!carro) {
    return <p>Car not found</p>;
  }else{
    console.log("car:", carro)
  }

  const carColor = `rgb(${carro.cor_rgb.join(', ')})`;

  return (
    
    <div className="text-black h-full w-full "
      style={{ backgroundColor: carColor }}> {/* Add text-black here */}
      
      <div className="car-details h-11/12">
            
          <div className='h-1/4 rounded-b-4xl'
            style={{ backgroundColor: 'rgb(250, 234, 189)' }}>

            <div className="h-full ml-10 flex flex-row">

              <div className='flex-col z-0'>

                <h2 className="card-title font-thin text-6xl ml-10 italic">
                  {carro.marca}
                </h2>

                <h1 className="card-title font-bold text-8xl italic ">
                  {carro.modelo}
                </h1>

              </div>

              <div className='absolute right-0 top-0 z-10 w-96'>
                <img
                  src={carro.imagem_url}
                  alt={`${carro.marca} ${carro.modelo}`}
                />
              </div>

            </div>

          </div>

          <div className='h-3/4' >
              <p className="text-black"><strong>Matricula:</strong> {carro.matricula}</p>
              <p className="text-black"><strong>Data de Fabrico:</strong> {carro.data_fabrico}</p>
              <p className="text-black"><strong>Eventos:</strong> {carro.eventos.join(', ')}</p>
              <p className="text-black"><strong>Color:</strong> RGB({carro.cor_rgb.join(', ')})</p>
          </div>
            
      </div>

      <div className='h-1/12'>
        <NavBar />
      </div>
      
    </div>
  );
}

export default CarDetails;