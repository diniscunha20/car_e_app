import React from 'react';
import { useParams } from 'react-router-dom';
import carrosData from '../assets/carros.json';

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

  return (
    <div className="car-details">
      <h2>Details for {carro.marca} {carro.modelo}</h2>
      <p><strong>Matricula:</strong> {carro.matricula}</p>
      <p><strong>Data de Fabrico:</strong> {carro.data_fabrico}</p>
      <p><strong>Eventos:</strong> {carro.eventos.join(', ')}</p>
      <p><strong>Color:</strong> RGB({carro.cor_rgb.join(', ')})</p>
      <img src={carro.imagem_url} alt={`${carro.marca} ${carro.modelo}`} />
    </div>
  );
}

export default CarDetails;