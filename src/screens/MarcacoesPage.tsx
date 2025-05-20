import { useEffect, useState } from "react";

const MarcacoesPage = () => {
  const [marcacoes, setMarcacoes] = useState<{ [matricula: string]: any }>({});

  useEffect(() => {
    const stored = localStorage.getItem("marcacoes");
    if (stored) {
      setMarcacoes(JSON.parse(stored));
    }
  }, []);

  return (
    <>
      <button
        onClick={() => window.history.back()}
        className="text-black font-black hover:underline ml-6 mt-4"
      >
        &lt;
      </button>

      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">Marcações por veículo</h1>

        {Object.keys(marcacoes).length === 0 ? (
          <div className="bg-black text-[#fffadf] p-4 rounded-3xl shadow-md text-center">
            <span>Nenhuma marcação encontrada.</span>
          </div>
        ) : (
          Object.entries(marcacoes).map(([matricula, eventos]) => (
            <div key={matricula}>
              <div className="bg-black rounded-3xl shadow-xl border border-[#fffadf]">
                <div className="p-3 text-[#fffadf]">
                  <h2 className="text-xl font-semibold ml-2 mb-3">{matricula}</h2>
                  <ul className="space-y-4">
                    {Object.entries(eventos).map(([data, details]: any) => (
                      <li key={data} className="bg-[#1c1c1c] rounded-xl p-4 border border-[#fffadf]/30">
                        <div className="flex flex-col space-y-1">
                          <span><strong>Data:</strong> {details.date}</span>
                          <span><strong>Hora:</strong> {details.hour}</span>
                          <span><strong>Problema:</strong> {details.prob}</span>
                          {details.description && (
                            <span><strong>Descrição:</strong> {details.description}</span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default MarcacoesPage;
