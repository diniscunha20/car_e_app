import React from 'react';
import "../assets/css/CarCard.css"

type Carro = {
    marca: string;
    modelo: string;
    matricula: string;
    eventos: string[];
    cor_rgb: number[]; // relax this type to avoid strict length checking
    data_fabrico: string;
    imagem_url: string;
};


const CarCard: React.FC<{ carro: Carro }> = ({ carro }) => {
  const carColor = `rgb(${carro.cor_rgb.join(', ')})`;

  return (

      <div className="card bg-stone-700  rounded-3xl mb-4 overflow-hidden shadow-xl text-white"
              style={{ color: '#F8F8E0' }}>
  
        {/* Topo: texto e imagem lado a lado */}
        <div className="h-15 flex flex-row items-center justify-between px-2 mb-3 mt-2">
          {/* Texto à esquerda */}
          <div className="flex flex-row text-left z-2">
            <h2 className="card-title font-thin text-3xl">
              {carro.marca}
            </h2>
            <h1 className="card-title font-bold text-6xl ml-3">
              {carro.modelo}
            </h1>
          </div>
  
          {/* Imagem à direita */}
          <div className="h-29 flex-shrink-0 mt-15 z-10 -ml-10">
            <img
              src={carro.imagem_url}
              alt={`${carro.marca} ${carro.modelo}`}
              className="w-full h-full object-cover rounded-l-3xl"
            />
          </div>
        </div>
  
        {/* Parte de baixo: detalhes ou descrição */}
        <div className="w-full  from-stone-900 to-stone-700 p-4 border-t border-stone-600 text-left rounded-2xl border-2"
             style={{ borderColor: carColor }}>
          <p>Matricula - {carro.matricula}</p>
          <p>Data fabrico - {carro.data_fabrico}</p>
        </div>
      </div>
    );
  };

export default CarCard;