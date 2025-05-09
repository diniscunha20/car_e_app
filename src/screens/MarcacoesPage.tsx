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
        className="text-black hover:underline ml-6 mt-4"
      >
        &lt;
      </button>

      <div className="max-w-3xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-6 text-center text-primary">Marcações por veículo</h1>

        {Object.keys(marcacoes).length === 0 ? (
          <div className="alert alert-info shadow-lg">
            <span>Nenhuma marcação encontrada.</span>
          </div>
        ) : (
          Object.entries(marcacoes).map(([matricula, eventos]) => (
            <div key={matricula} className="mb-6">
              <div className="card bg-base-100 shadow-md border border-base-200">
                <div className="card-body">
                  <h2 className="card-title text-secondary">{matricula}</h2>
                  <ul className="space-y-2">
                    {Object.entries(eventos).map(([data, details]: any) => (
                      <li key={data} className="bg-base-200 rounded p-3">
                        <div className="flex flex-col">
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
