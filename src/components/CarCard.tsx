import React from 'react';
import "../assets/css/CarCard.css"
import { Carro } from '../assets/Props';



const CarCard: React.FC<{ carro: Carro }> = ({ carro }) => {
  const carColor = `rgb(${carro.cor_rgb.join(', ')})`;

  return (

        <div
          className="card bg-stone-800 border-stone-900 rounded-3xl mb-4 overflow-hidden"
          style={{
            color: '#fff7d0',
            boxShadow: '0px 2px 10px 5px rgba(28, 25, 23, 0.2)' // sombra mais subtil e suave
          }}
        >
  
        {/* Topo: texto e imagem lado a lado */}
        <div className="h-15 flex flex-row items-center justify-items-center px-1 mb-3 mt-2">
          {/* Texto à esquerda */}
          <div className="flex flex-row text-left z-10">
            <h2 className="card-title font-thin text-3xl">
              {carro.marca}
            </h2>
            <h1 className="card-title font-bold text-6xl ml-3">
              {carro.modelo}
            </h1>
          </div>
  
          {/* Imagem à direita */}
          <div className="w-40 absolute right-0 mt-15 z-20 -ml-10">
            <img
              src={carro.imagem_url}
              alt={`${carro.marca} ${carro.modelo}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
  
        {/* Parte de baixo: detalhes ou descrição */}
        <div
          className="w-full p-4 text-left rounded-2xl border-2 bg-stone-700"
          style={{borderColor: carColor, boxShadow: `inset 0 0 6px ${carColor}`}}
        >

          <p>Matrícula - {carro.matricula}</p>
          <p>Data fabrico - {carro.data_fabrico}</p>
          <p>Quilometragem - {carro.quilometragem}km</p>
        </div>
      </div>
    );
  };

export default CarCard;