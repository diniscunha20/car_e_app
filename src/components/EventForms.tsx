import { useState } from "react";
import { Carro } from "../assets/Props";
import { useParams } from "react-router-dom";

interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const EventForms: React.FC<Props> = ({ setShowModal }) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const { matricula } = useParams<{ matricula: string }>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const stored = localStorage.getItem("carros");
    if (!stored) return;

    const carros = JSON.parse(stored);
    const updatedCarros = carros.map((carro: Carro) => {
      if (carro.matricula === matricula) {
        return {
          ...carro,
          eventos: {
            ...carro.eventos,
            [description]: date,
          },
        };
      }
      return carro;
    });

    localStorage.setItem("carros", JSON.stringify(updatedCarros));
    alert("Evento adicionado com sucesso!");
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

      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700"
      >
        Adicionar Evento
      </button>
    </form>
  );
};

export default EventForms;
