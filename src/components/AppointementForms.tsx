import React, { useState, useEffect } from "react";
import { Carro } from "../assets/Props";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {useMapContext} from "./MapContext.tsx";

interface Props {
  content: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppointementForms: React.FC<Props> = ({ content, setShowModal }) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [carro, setCarro] = useState("");
  const [prob, setProb] = useState("");
  const [availableCars, setAvailableCars] = useState<Carro[]>([]);
  const [availableEvents, setAvailableEvents] = useState<string[]>([]);

  const { car, event, reset } = useMapContext(); // Context values
  const navigate = useNavigate();

  const formValid = date && hour && carro && prob;

  // Load car list from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("carros");
    if (stored) {
      const cars = JSON.parse(stored) as Carro[];
      setAvailableCars(cars);

      const matchedCar = cars.find(c => c.modelo === car || c.matricula === car);
      if (matchedCar) {
        setCarro(matchedCar.matricula);
        const events = Object.keys(matchedCar.eventos);
        setAvailableEvents(events);

        if (event && events.includes(event)) {
          setProb(event);
        }
      }
    }
  }, [car, event]);

  // Update events list when selected car changes
  useEffect(() => {
    const selectedCar = availableCars.find(c => c.matricula === carro);
    if (selectedCar) {
      const events = Object.keys(selectedCar.eventos);
      setAvailableEvents(events);

      // Reset prob if not valid for the new car
      if (!events.includes(prob)) {
        setProb("");
      }
    }
  }, [carro]);

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const stored = localStorage.getItem("carros");
    if (!stored) return;
  
    const carros = JSON.parse(stored);
  
    const marcacoesStored = localStorage.getItem("marcacoes");
    const marcacoes = marcacoesStored ? JSON.parse(marcacoesStored) : {};
  
    if (!marcacoes[carro]) {
      marcacoes[carro] = {};
    }
  
    marcacoes[carro][date] = {
      date,
      prob,
      hour,
      description,
    };
  
    // Find the car by modelo, matricula, or marca — adjust as you identify the car
    const carroIndex = carros.findIndex(c => c.modelo === carro || c.matricula === carro || c.marca === carro);
  
    if (carroIndex !== -1) {
      // Remove the event matching the selected prob
      if (carros[carroIndex].eventos && carros[carroIndex].eventos[prob]) {
        delete carros[carroIndex].eventos[prob];
      }
    }
  
    localStorage.setItem("marcacoes", JSON.stringify(marcacoes));
    localStorage.setItem("carros", JSON.stringify(carros));
  
    alert("Marcação adicionada com sucesso e evento removido!");
  
    reset();
    setShowModal(false);
    navigate("/");
  };
  

  return (
  <div className="relative w-[85%] mx-auto bg-[#fdfadf] rounded-3xl border-4 border-gray-800 p-6 shadow-md">
    <button
      onClick={() => setShowModal(false)}
      className="absolute top-4 right-4 bg-stone-800 hover:bg-gray-400 text-[#fdfadf] rounded-full w-7 h-7 flex items-center justify-center shadow"
    >
      <FontAwesomeIcon icon={faTimes} className="text-lg" />
    </button>

      <div className="flex justify-between items-start">
        <h1 className="text-3xl font-bold text-black leading-tight">{content}</h1>
        <img
          src="https://via.placeholder.com/100x70.png?text=Oficina"
          alt="Oficina"
          className="rounded-md w-[100px] h-[70px] object-cover"
        />
      </div>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Data</label>
          <input
            type="date"
            className="w-full rounded-md bg-[#fcf8e3] p-2 border border-gray-300 text-black"
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Hora</label>
          <input
            type="time"
            className="w-full rounded-md bg-[#fcf8e3] p-2 border border-gray-300 text-black"
            onChange={(e) => setHour(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Carro</label>
          <select
            className="w-full rounded-md bg-[#fcf8e3] p-2 border border-gray-300 text-gray-700"
            value={carro}
            onChange={(e) => setCarro(e.target.value)}
            required
          >
            <option value="" disabled>Selecione o veículo ...</option>
            {availableCars.map((c) => (
              <option key={c.matricula} value={c.matricula}>
                {c.marca} {c.modelo}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Problema</label>
          <select
            className="w-full rounded-md bg-[#fcf8e3] p-2 border border-gray-300 text-gray-700"
            value={prob}
            onChange={(e) => setProb(e.target.value)}
            required
          >
            <option value="" disabled>Selecione o que mais se adequa...</option>
            {availableEvents.map((ev) => (
              <option key={ev} value={ev}>{ev}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Descreva melhor o problema (opcional)
          </label>
          <textarea
            rows={3}
            placeholder="Escreva aqui"
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-md bg-[#fcf8e3] p-2 border border-gray-300 text-black"
          />
        </div>

        <button
          type="submit"
          disabled={!formValid}
          className={`w-full font-bold py-2 px-4 rounded-xl mt-4 transition-colors duration-300 ${
            formValid
              ? "bg-[#e39073] hover:bg-[#d87b5d] text-white"
              : "bg-gray-400 text-white cursor-not-allowed"
          }`}
        >
          Concluir
        </button>
      </form>
    </div>
  );
};

export default AppointementForms;
