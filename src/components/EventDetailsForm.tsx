import React, { useState } from "react";
import { Carro } from "../assets/Props";
import { useParams, useNavigate } from 'react-router-dom';
import {useMapContext} from "./MapContext.tsx";

interface Props {
  data: string;
  desc: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const EventDetailsForm: React.FC<Props> = ({ data, desc, setShowModal }) => {
  const [description, setDescription] = useState(desc);
  const [date, setDate] = useState(data);
  const { reset } = useMapContext();
  const { matricula } = useParams<{ matricula: string }>();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const stored = localStorage.getItem('carros');
    if (!stored) return;

    const carros = JSON.parse(stored);
    const updatedCarros = carros.map((carro: Carro) => {
      if (carro.matricula === matricula) {
        const { [desc]: _, ...remainingEventos } = carro.eventos;

        return {
          ...carro,
          eventos: {
            ...remainingEventos,
            [description]: date,
          },
        };
      }

      return carro;
    });

    localStorage.setItem('carros', JSON.stringify(updatedCarros));
    alert('Evento editado com sucesso!');
    reset();
    setShowModal(false);
  };

  const handleRemove = (e: React.FormEvent) => {
    e.preventDefault();

    const stored = localStorage.getItem('carros');
    if (!stored) return;

    const carros = JSON.parse(stored);
    const updatedCarros = carros.map((carro: Carro) => {
      if (carro.matricula === matricula) {
        const { [desc]: _, ...remainingEventos } = carro.eventos;

        return {
          ...carro,
          eventos: { ...remainingEventos },
        };
      }

      return carro;
    });

    localStorage.setItem('carros', JSON.stringify(updatedCarros));
    alert('Evento removido com sucesso!');
    reset();
    setShowModal(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Descrição do problema</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descreva o problema"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Data</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>

      <div className="flex justify-center space-x-4">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700"
        >
          Salvar
        </button>

        <button
          type="button"
          onClick={handleRemove}
          className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700"
        >
          Remover
        </button>

        <button
          type="button"
          onClick={() => navigate('/map')}
          className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700"
        >
          Marcar
        </button>
      </div>
    </form>
  );
};

export default EventDetailsForm;
