import { useState } from "react";
import { Carro } from "../assets/Carro";
import { useParams } from 'react-router-dom';


const AppointementForms = () =>  {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const {matricula} = useParams<{ matricula: string }>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const stored = localStorage.getItem('carros');
    if (!stored) return;

    const carros = JSON.parse(stored);
    const updatedCarros = carros.map((carro: Carro) => {
        
        if (carro.matricula === matricula) {
  
            const updatedCarro = {
              ...carro,
              eventos: {
                ...carro.eventos,
                [description]: date,
              },
            };
      
            return updatedCarro;
          }
        return carro;
    });
  
    console.log(updatedCarros)
    localStorage.setItem('carros', JSON.stringify(updatedCarros));
    alert('Evento adicionado com sucesso!');
  };

  return (
    <div className="max-w-md mx-auto bg-[#fdfadf] rounded-3xl border-4 border-gray-800 p-6 shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 leading-tight">
            Oficina<br />besta dos<br />games
          </h1>
        </div>
        <img
          src="https://via.placeholder.com/100x70.png?text=Oficina"
          alt="Oficina"
          className="rounded-md w-[100px] h-[70px] object-cover"
        />
      </div>

      <form className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Data</label>
          <input
            type="text"
            placeholder="XX/XX/XXXX"
            className="w-full rounded-md bg-[#fcf8e3] p-2 border border-gray-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Hora</label>
          <input
            type="text"
            placeholder="XX:XX"
            className="w-full rounded-md bg-[#fcf8e3] p-2 border border-gray-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Carro</label>
          <select className="w-full rounded-md bg-[#fcf8e3] p-2 border border-gray-300">
            <option>Selecione o veículo ...</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Problema</label>
          <select className="w-full rounded-md bg-[#fcf8e3] p-2 border border-gray-300">
            <option>Selecione o que mais se adequa...</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800">
            Descreva melhor o problema (opcional)
          </label>
          <textarea
            rows={3}
            placeholder="Escreva aqui"
            className="w-full rounded-md bg-[#fcf8e3] p-2 border border-gray-300"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#e39073] hover:bg-[#d87b5d] text-white font-bold py-2 px-4 rounded-xl mt-4"
        >
          Concluir
        </button>
      </form>
    </div>
  );
};

export default AppointementForms;
