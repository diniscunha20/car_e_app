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
    <div className="card h-60 bg-gradient-to-bl from-stone-700 to-stone-900 rounded-3xl mb-2 overflow-hidden shadow-xl" >
        <div>
            <h2 className="card-title font-medium text-2xl">
            {carro.marca}
            </h2>
            <h1 className="card-title font-medium text-2xl" >{carro.modelo}</h1>
        </div>

        
        <div className="w-full h-full flex-col bg-gradient-to-bl from-stone-900 to-stone-700  rounded-2xl text-amber-100 p-4 border-2 text-left mt-2">
            <div>
                <p className="mt-auto">A card component has a figure, a body part, and inside body there are title and actions parts</p>
            </div>
        </div>
        <img src={carro.imagem_url} className="w-full h-40 object-cover rounded-t-3xl" />

    </div>
    );
       
  }
  
  export default CarCard;
  