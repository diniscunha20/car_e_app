import React from 'react';
import "../assets/css/CarCard.css";
import { Carro } from '../assets/Props';

const CarCard: React.FC<{ carro: Carro }> = ({ carro }) => {
  const carColor = `rgb(${carro.cor_rgb.join(', ')})`;

  const today = new Date();

  const hasDueEvents = Object.values(carro.eventos || {}).some((data: string) => {
    const eventDate = new Date(data);
    return eventDate < today;
  });

  return (
    <div
      className="card bg-stone-800 rounded-3xl mb-4 overflow-hidden "
      style={{
          borderColor: hasDueEvents ? 'red' : '#171717',
          borderWidth: hasDueEvents ? '3px' : '2px',
        color: '#fff7d0',
        boxShadow: '0px 2px 10px 5px rgba(28, 25, 23, 0.2)',
      }}
    >
      {/* Top: brand/model and image */}
      <div className="h-15 flex flex-row items-center justify-items-center px-1 mb-3 mt-2 relative">
        <div className="flex flex-row text-left z-10">
          <h2 className="card-title font-thin text-3xl">{carro.marca}</h2>
          <h1 className="card-title font-bold text-6xl ml-3">{carro.modelo}</h1>
        </div>
        <div className="w-40 absolute right-0 mt-15 z-20 -ml-10">
          <img
            src={carro.imagem_url}
            alt={`${carro.marca} ${carro.modelo}`}
            className="w-full h-full object-cover"
          />
        </div>
        {hasDueEvents && (
          <div className="absolute -top-5 right-4 flex items-center text-red-600 font-semibold text-xl">
            ⚠️ Has due events
          </div>
        )}
      </div>

      {/* Bottom: details */}
      <div
        className="w-full p-4 text-left rounded-2xl bg-stone-700"
        style={{
          borderColor: carColor,
          boxShadow: `inset 0 0 6px ${carColor}`,
        }}
      >
        <p>Matrícula - {carro.matricula}</p>
        <p>Data fabrico - {carro.data_fabrico}</p>
        <p>Quilometragem - {carro.quilometragem}km</p>
      </div>
    </div>
  );
};

export default CarCard;
