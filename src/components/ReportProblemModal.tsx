import React, { useState } from "react";

type ReportProblemModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ReportProblemModal = ({ isOpen, onClose }: ReportProblemModalProps) => {
  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState("");
  const [descricao, setDescricao] = useState("");

  const isFormComplete = titulo.trim() !== "" && tipo.trim() !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormComplete) return;

    const subject = `Relatório de Problema - ${titulo}`;
    const body = `Título: ${titulo}\nTipo: ${tipo}\nDescrição: ${descricao}`;

    window.location.href = `mailto:support@care.pt?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed flex flex-col items-center justify-center z-50 w-[90%]">
      <div className="max-w-md w-full bg-[#fff7d0] rounded-3xl border-4 border-gray-800 p-6 shadow-md relative">
        <button
          className="absolute top-5 right-5 text-[#fff7d0] font-bold text-xl w-7 h-7 bg-stone-800 rounded-full flex items-center justify-center"
          onClick={onClose}
        >
          ×
        </button>

        <h1 className="text-2xl font-bold text-gray-800 mb-4">Comunicar Problema</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Título do problema</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full rounded-md bg-[#fcf8e3] p-2 border border-gray-300 text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo</label>
            <input
              type="text"
              placeholder="Ex: Bug, Erro, Sugestão..."
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full rounded-md bg-[#fcf8e3] p-2 border border-gray-300 text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800">
              Descrição detalhada
            </label>
            <textarea
              rows={4}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="w-full rounded-md bg-[#fcf8e3] p-2 border border-gray-300 text-black"
              placeholder="Descreve o que aconteceu, passos para reproduzir, etc."
            />
          </div>
          <button
            type="submit"
            disabled={!isFormComplete}
            className={`w-full font-bold py-2 px-4 rounded-xl mt-4 transition-colors duration-200 ${
              isFormComplete
                ? "bg-[#e39073] hover:bg-[#d87b5d] text-white"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            Enviar relatório
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportProblemModal;
