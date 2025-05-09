import { useState } from "react";
import { Carro } from "../assets/Props";

const AppointementForms = () =>  {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [carro, setCarro] = useState("");
  const [prob, setProb] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const stored = localStorage.getItem('carros');
    if (!stored) return;

    const marcacoesStored = localStorage.getItem('marcacoes');
    const marcacoes = marcacoesStored ? JSON.parse(marcacoesStored) : {};

    // Add or update a "marcacao" entry for this car and date
    if (!marcacoes[carro]) {
      marcacoes[carro] = {};
    }

    marcacoes[carro][date] = {
      date,
      prob,
      hour,
      description,
    };

    console.log("Marcações atualizadas:", marcacoes);

    localStorage.setItem('marcacoes', JSON.stringify(marcacoes));
    alert('Marcação adicionada com sucesso!');
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
            defaultValue="default"
            onChange={(e) => setCarro(e.target.value)}
            required
          >
            <option className="text-gray-700" value="default" disabled>Selecione o veículo ...</option>
            {(() => {
              const stored = localStorage.getItem('carros');
              if (!stored) return null;

              const carros = JSON.parse(stored);
              return carros.map((carro: Carro) => (
                <option key={carro.matricula} value={carro.matricula} className="text-gray-700">
                  {carro.marca + ' ' + carro.modelo}
                </option>
              ));
            })()}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Problema</label>
          <select
            className="w-full rounded-md bg-[#fcf8e3] p-2 border border-gray-300 text-gray-700"
            defaultValue="default"
            onChange={(e) => setProb(e.target.value)}
            required
          >
            <option  className="text-gray-700" value="default" disabled>Selecione o que mais se adequa...</option>
            {(() => {
              const stored = localStorage.getItem('carros');
              if (!stored || !carro) return null;

              const carros = JSON.parse(stored);
              const selectedCarro = carros.find((car: Carro) => car.matricula == carro);

              if (!selectedCarro || !selectedCarro.eventos) return null;

              return Object.entries(selectedCarro.eventos).map(([desc, date]) => (
                <option key={desc} value={desc} className="text-gray-700">
                  {desc}
                </option>
              ));
            })()}
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
          className="w-full bg-[#e39073] hover:bg-[#d87b5d] text-white font-bold py-2 px-4 rounded-xl mt-4"
        >
          Concluir
        </button>
      </form>
    </div>
  );
};

export default AppointementForms;
