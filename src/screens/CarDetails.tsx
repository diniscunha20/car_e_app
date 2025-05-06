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
  eventos: Record<string, string>; // keys are event names, values are ISO date strings
  cor_rgb: number[];
  data_fabrico: string;
  imagem_url: string;
  quilometragem: number; // also added the kilometers field
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




  const brightenColor = (color: string): string => {

    const [r, g, b] = color.match(/\d+/g)?.map(Number) ?? [0, 0, 0];
  
    const brightenFactor = 20;
  
    const newColor = `rgb(${Math.min(r + brightenFactor, 255)}, ${Math.min(g + brightenFactor, 255)}, ${Math.min(b + brightenFactor, 255)})`;
  
    return newColor;
  };
  
  const carColor = `rgb(${carro.cor_rgb.join(', ')})`;
  const brightCarColor = brightenColor(carColor);



  return (
    
    <div className="text-black h-full w-full "
      style={{ backgroundColor: brightCarColor }}> {/* Add text-black here */}

    <div className="absolute h-70 w-full flex-shrink-0 mt-5 z-10  overflow-x-hidden">
      <img
        src={carro.imagem_url}
        alt={`${carro.marca} ${carro.modelo}`}
        className="ml-30 w-full h-full object-cover rounded-l-3xl"
      />
    </div>

      
      <div className="relative car-details h-11/12">
            
          <div className='relative h-1/4 rounded-b-4xl'
            style={{ backgroundColor: 'rgb(250, 234, 189)' }}>

            <div className="h-full ml-2 flex flex-row">

              <div className='flex-col z-0'>

                <h2 className="card-title font-thin text-6xl ml-10 italic">
                  {carro.marca}
                </h2>

                <h1 className="card-title font-bold text-8xl italic ">
                  {carro.modelo}
                </h1>

              </div>

              

            </div>

          </div>

          <div className='h-3/4'>

            <div className='h-1/11'>
                <h1 className="card-title font-normal text-2xl ml-6 mt-4 italic" 
                style={{ color: 'rgb(250, 234, 189)' }}>
                  {carro.matricula}
                </h1>
            </div>

            <h2 className="text-xl font-bold mb-2">Eventos</h2>
            
              {Object.entries(carro.eventos).map(([evento, data]) => (
                <div className='h-1/10 w-[95%] mt-2  flex items-center rounded-r-2xl' key={evento} style={{ backgroundColor: carColor }}>
                  <h1 className='ml-3'><strong>{evento}:</strong> {data}</h1>
                </div>
              ))}
            
          </div>

        <div className='fixed'>
          <NavBar />

        </div>
      </div>

      
    </div>
  );
}

export default CarDetails;