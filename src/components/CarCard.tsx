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
    return (
      <div className="card bg-gradient-to-bl from-stone-700 to-stone-900 rounded-3xl mb-4 overflow-hidden shadow-xl text-white">
  
        {/* Topo: texto e imagem lado a lado */}
        <div className="h-15 flex flex-row items-center justify-between px-2 mb-3 mt-2">
          {/* Texto à esquerda */}
          <div className="flex flex-col text-left">
            <h2 className="card-title font-medium text-2xl">
              {carro.marca}
            </h2>
            <h1 className="card-title font-bold text-2xl ">
              {carro.modelo}
            </h1>
          </div>
  
          {/* Imagem à direita */}
          <div className="h-32 flex-shrink-0 mt-4 z-10">
            <img
              src={carro.imagem_url}
              alt={`${carro.marca} ${carro.modelo}`}
              className="w-full h-full object-cover rounded-l-3xl"
            />
          </div>
        </div>
  
        {/* Parte de baixo: detalhes ou descrição */}
        <div className="w-full bg-gradient-to-bl from-stone-900 to-stone-700 text-amber-100 p-4 border-t border-stone-600 text-left rounded-2xl border-2">
          <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
        </div>
      </div>
    );
  };

export default CarCard;