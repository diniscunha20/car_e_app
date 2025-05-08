import React, { useState } from "react";

type ReportProblemModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ReportProblemModal = ({ isOpen, onClose }: ReportProblemModalProps) => {
  const [carro, setCarro] = useState("");
  const [problema, setProblema] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = `Problema reportado - ${carro}`;
    const body = `Veículo: ${carro}\nProblema: ${problema}\nDescrição: ${descricao}`;

    window.location.href = `mailto:support@care.pt?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    onClose(); // Fecha o modal após enviar
  };

  if (!isOpen) return null;

  return (
    <div className="fixed flex flex-col items-center justify-center z-50 w-[90%]">
      <div className="max-w-md w-full bg-[#fdfadf] rounded-3xl border-4 border-gray-800 p-6 shadow-md relative">
        <button
          className="absolute top-3 right-3 text-black font-bold text-xl"
          onClick={onClose}
        >
          ×
        </button>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">Comunicar Problema</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Carro</label>
            <input
              type="text"
              value={carro}
              onChange={(e) => setCarro(e.target.value)}
              className="w-full rounded-md bg-[#fcf8e3] p-2 border border-gray-300 text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Problema</label>
            <input
              type="text"
              value={problema}
              onChange={(e) => setProblema(e.target.value)}
              className="w-full rounded-md bg-[#fcf8e3] p-2 border border-gray-300 text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800">
              Descrição (opcional)
            </label>
            <textarea
              rows={3}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="w-full rounded-md bg-[#fcf8e3] p-2 border border-gray-300 text-black"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#e39073] hover:bg-[#d87b5d] text-white font-bold py-2 px-4 rounded-xl mt-4"
          >
            Enviar para oficina
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportProblemModal;
