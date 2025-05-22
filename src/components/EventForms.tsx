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

  const isFormComplete = description.trim() !== "" && date.trim() !== "";

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
    <div className="relative bg-[#fff7d0] border-4 border-gray-800 rounded-3xl shadow-md p-6">
      {/* Botão de fechar */}
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-6 right-6 text-[#fff7d0] font-bold text-xl w-8 h-8 bg-stone-800 rounded-full flex items-center justify-center hover:bg-stone-700 transition-colors"
      >
        ×
      </button>

      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Adicionar Evento</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700">Descrição do problema</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descreva o problema"
            className="mt-1 block w-full rounded-md bg-[#fcf8e3] border border-gray-300 shadow-sm p-2 text-black"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Data</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full rounded-md bg-[#fcf8e3] border border-gray-300 shadow-sm p-2 text-black"
            required
          />
        </div>

        <button
          type="submit"
          disabled={!isFormComplete}
          className={`w-full font-bold py-2 px-4 rounded-xl transition-colors ${
            isFormComplete
              ? "bg-[#e39073] hover:bg-[#d87b5d] text-white"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          Adicionar Evento
        </button>
      </form>
    </div>
  );
};

export default EventForms;
