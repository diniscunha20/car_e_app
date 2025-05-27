import { useState } from "react";

type AddCarModalProps = {
  onClose: () => void;
};

const AddCarModal = ({ onClose }: AddCarModalProps) => {
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [matricula, setMatricula] = useState("");
  const [dataFabrico, setDataFabrico] = useState("");
  const [quilometragem, setQuilometragem] = useState<number>(0);
  const [imagemUrl, setImagemUrl] = useState("");
  const [corRGB, setCorRGB] = useState<[number, number, number]>([0, 0, 0]);

  const [eventos, setEventos] = useState<{ [key: string]: string }>({});
  const [eventoNome, setEventoNome] = useState("");
  const [eventoData, setEventoData] = useState("");

  const handleAddEvento = () => {
    if (eventoNome && eventoData) {
      setEventos((prev) => ({ ...prev, [eventoNome]: eventoData }));
      setEventoNome("");
      setEventoData("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const novoCarro = {
      marca,
      modelo,
      matricula,
      data_fabrico: dataFabrico,
      quilometragem,
      imagem_url: "/images/placeholder.png",
      cor_rgb: corRGB,
      eventos,
    };

    const stored = localStorage.getItem("carros");
    const carros = stored ? JSON.parse(stored) : [];

    carros.push(novoCarro);
    localStorage.setItem("carros", JSON.stringify(carros));
    alert("Carro adicionado com sucesso!");

    // Limpar formulário
    setMarca("");
    setModelo("");
    setMatricula("");
    setDataFabrico("");
    setQuilometragem(0);
    setImagemUrl("");
    setCorRGB([0, 0, 0]);
    setEventos({});

    onClose();
  };

  return (
    <div className="w-[90%] mx-auto bg-[#fff7d0] border-2 border-stone-800 rounded-3xl p-6 shadow-xl text-black">
      <h2 className="text-2xl font-bold mb-4">Adicionar Novo Carro</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Marca"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
          required
          className="w-full p-2 border border-black rounded-xl bg-transparent text-black placeholder-gray-600"
        />
        <input
          placeholder="Modelo"
          value={modelo}
          onChange={(e) => setModelo(e.target.value)}
          required
          className="w-full p-2 border border-black rounded-xl bg-transparent text-black placeholder-gray-600"
        />
        <input
          placeholder="Matrícula"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
          required
          className="w-full p-2 border border-black rounded-xl bg-transparent text-black placeholder-gray-600"
        />
        <input
          type="date"
          value={dataFabrico}
          onChange={(e) => setDataFabrico(e.target.value)}
          required
          className="w-full p-2 border border-black rounded-xl bg-transparent text-black"
        />
        <input
          type="number"
          placeholder="Quilometragem"
          value={quilometragem}
          onChange={(e) => setQuilometragem(Number(e.target.value))}
          required
          className="w-full p-2 border border-black rounded-xl bg-transparent text-black placeholder-gray-600"
        />

        {/* Cor RGB */}
        <div>
          <label className="block text-sm font-semibold text-black mb-1">Cor</label>
          <select
            className="w-full p-2 border border-black rounded-xl text-black placeholder-gray-600"
            onChange={(e) => {
              const selected = e.target.value;
              const colorMap: { [key: string]: [number, number, number] } = {
                Vermelho: [255, 0, 0],
                Azul: [0, 0, 255],
                Verde: [0, 128, 0],
                Amarelo: [255, 255, 0],
                Preto: [0, 0, 0],
                Branco: [255, 255, 255],
                Laranja: [255, 165, 0],
                Cinzento: [128, 128, 128],
                Rosa: [255, 192, 203],
                Roxo: [128, 0, 128],
              };
              setCorRGB(colorMap[selected]);
            }}
            defaultValue=""
            required
          >
            <option value="" disabled>Seleciona uma cor...</option>
            <option value="Vermelho">Vermelho</option>
            <option value="Azul">Azul</option>
            <option value="Verde">Verde</option>
            <option value="Amarelo">Amarelo</option>
            <option value="Preto">Preto</option>
            <option value="Branco">Branco</option>
            <option value="Laranja">Laranja</option>
            <option value="Cinzento">Cinzento</option>
            <option value="Rosa">Rosa</option>
            <option value="Roxo">Roxo</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-xl font-bold"
        >
          Guardar Carro
        </button>
      </form>
    </div>
  );
};

export default AddCarModal;
