import React,{ useState }  from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import NavBar from '../components/NavBar';
import "../assets/css/CarCard.css"
import EventForms from '../components/EventForms';
import EventDetailsForm from "../components/EventDetailsForm.tsx";
import { Carro } from '../assets/Props';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const CarDetails: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModalEventInfo, setShowModalEventInfo] = useState(false);
  const { matricula } = useParams<{ matricula: string }>();
  const navigate = useNavigate();

  const [selectedData, selectedDataUpdate] = useState("");
  const [selectedDesc, selectedDescUpdate] = useState("");

  const stored = localStorage.getItem('carros');
  if (!stored) return <p>No data in localStorage</p>;

  const carros: Carro[] = JSON.parse(stored);

  const carro = carros.find((car) => car.matricula === matricula);

  if (!carro) {
    return <p>Car not found</p>;
  } else {
    console.log("Car from localStorage:", carro);
  }

  const sortedEventos = Object.entries(carro.eventos).sort(([, dateA], [, dateB]) =>
    new Date(dateA).getTime() - new Date(dateB).getTime()
  );
  

  const adjustColorBrightness = (color: string): { baseColor: string; brightColor: string; textColor: string } => {
    const [r, g, b] = color.match(/\d+/g)?.map(Number) ?? [0, 0, 0];
  
    const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
    const factor = 40;
  
    let newR: number, newG: number, newB: number;
    let baseColor: string, brightColor: string, textColor: string;
  
    if (brightness > 186) {
      // Bright color — darken it, and swap
      newR = Math.max(r - factor, 0);
      newG = Math.max(g - factor, 0);
      newB = Math.max(b - factor, 0);
      baseColor = `rgb(${newR}, ${newG}, ${newB})`;
      brightColor = color; // original was bright
      textColor = 'black'; // Use black text on bright backgrounds
    } else {
      // Dark color — brighten it
      newR = Math.min(r + factor, 255);
      newG = Math.min(g + factor, 255);
      newB = Math.min(b + factor, 255);
      baseColor = color; // original was dark
      brightColor = `rgb(${newR}, ${newG}, ${newB})`;
      textColor = 'rgb(250, 234, 189)'; // Use white text on dark backgrounds
    }
  
    return { baseColor, brightColor, textColor };
  };
  
  
  const carColor = `rgb(${carro.cor_rgb.join(', ')})`;
  const { baseColor, brightColor, textColor } = adjustColorBrightness(carColor);

  return (
    
    <div className="text-black h-full w-full "
      style={{ backgroundColor: brightColor }}> {/* Add text-black here */}

    <div className="absolute h-70 w-full flex-shrink-0 mt-5 z-10  overflow-x-hidden">
      <img
        src={carro.imagem_url}
        alt={`${carro.marca} ${carro.modelo}`}
        className="ml-40 w-full h-full object-cover"
      />
    </div>

      
      <div className="relative car-details h-11/12">
            
        <div
          className="relative h-1/4"
          style={{
            backgroundColor: 'rgb(250, 234, 189)',
            boxShadow: 'inset 0 -15px 20px -4px rgba(0, 0, 0, 0.3)', // sombra apenas no fundo
          }}
        >
            <button
              onClick={() => window.history.back()}
              className="mt-5 ml-5 text-black hover:underline absolute z-40"
            >
              <strong>&lt;</strong>
            </button>

            <div className="h-full ml-2 flex flex-row">

              <div className='flex-col z-0 mt-3'>

              <div className="max-w-full overflow-hidden">
                <h2 className="truncate font-medium italic text-7xl">
                  {carro.marca}
                </h2>
              </div>


              <h1 className="card-title font-bold ml-5 text-8xl italic ">
                {carro.modelo}
              </h1>

              </div>

            </div>

            </div>

          <div className='h-3/4' style={{color: textColor  }}>

            <div className='h-1/11'>
                <h1 className="card-title font-normal text-2xl ml-6 mt-4 italic">
                  {carro.matricula}
                </h1>
            </div>


            <div className='h-2/11'>
              <h2 className="text-xl font-bold mb-2 ml-3" style={{ color: textColor }}>Próximo evento</h2>

              {sortedEventos.slice(0, 1).map(([evento, data]) => (
                <div
                  className="h-3/4 w-[95%] flex items-center rounded-r-3xl"
                  key={evento}
                  style={{ backgroundColor: baseColor, color: textColor }}
                  onClick={() => {
                    setShowModalEventInfo(true);
                    selectedDataUpdate(data);
                    selectedDescUpdate(evento);
                  }}
                >
                  <h1 className="ml-3 w-[70%]">
                    <strong>{evento}:</strong> {data}
                  </h1>

                  <button
                    className="btn border-none px-4 py-2 rounded-lg shadow hover:bg-indigo-700"
                    style={{ backgroundColor: brightColor, color: textColor }}
                    onClick={() => navigate("/map")}
                  >
                    Marcar
                  </button>
                </div>
              ))}
            </div>

            <div className='flex flex-row  border-t-4 mt-10' style={{ borderColor: textColor, color: textColor }}>
              
              <div className='w-1/2'>
              <h2 className="text-xl font-bold ml-3 py-2" >Outros</h2>
              </div>

              <div className='w-1/2 justify-end flex'>
                <button
                  onClick={() => setShowModal(true)}
                  className=" text-3xl font-bold rounded-full size-6 shadow-lg mr-5 mt-3"
                  style={{ color: baseColor, background: textColor }}
                >
                  <h1 className='font-bold -mt-2'>+</h1>
                </button>
                <button
                  onClick={() => {
                    if (!matricula) return;

                    const confirmDelete = window.confirm("Tens a certeza que queres eliminar este carro?");
                    if (!confirmDelete) return;

                    const stored = localStorage.getItem('carros');
                    if (!stored) return;

                    const carros = JSON.parse(stored) as Carro[];
                    const updated = carros.filter(c => c.matricula !== matricula);

                    localStorage.setItem('carros', JSON.stringify(updated));

                    // Opcional: também apagar marcações associadas
                    const marcacoesRaw = localStorage.getItem('marcacoes');
                    if (marcacoesRaw) {
                      const marcacoes = JSON.parse(marcacoesRaw);
                      delete marcacoes[matricula];
                      localStorage.setItem('marcacoes', JSON.stringify(marcacoes));
                    }

                    alert("Carro eliminado com sucesso!");
                    navigate('/');
                  }}
                  className="text-3xl font-bold rounded-full size-6 shadow-lg mr-5 mt-3"
                  style={{ color: baseColor, background: textColor }}
                >
                  <h1 className="font-bold ml-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="3"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21
                          c.342.052.682.107 1.022.166m-1.022-.165L18.16
                          19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25
                          2.25 0 0 1-2.244-2.077L4.772 5.79m14.456
                          0a48.108 48.108 0 0 0-3.478-.397m-12
                          .562c.34-.059.68-.114 1.022-.165m0 0a48.11
                          48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91
                          -2.164-2.09-2.201a51.964 51.964 0 0 0-3.32
                          0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5
                          0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </h1>
                </button>

              </div>
            </div>

            <div className='h-[50%] overflow-y-auto'>
              {sortedEventos.slice(1).map(([evento, data], index) => (
                <div
                  className={`h-1/4 mt-4 w-[95%] flex items-center ${index % 2 === 0 ? 'rounded-l-3xl ml-5' : 'rounded-r-3xl'}`}
                  key={evento}
                  style={{ backgroundColor: baseColor }}
                  onClick={() => {
                    setShowModalEventInfo(true);
                    selectedDataUpdate(data);
                    selectedDescUpdate(evento);
                  }}
                >
                  <h1 className={`${index % 2 === 0 ? 'ml-5 w-[70%]' : 'ml-10 w-[55%]'}`}>
                    <strong>{evento}:</strong> {data}
                  </h1>
                </div>
              ))}
            </div>


            <div className='h-[5%]'>
            <div className='h-[5%] items-center flex justify-end'>
              
            </div>

            </div>

          </div>

        <div className='fixed'>
          <NavBar />

        </div>
      </div>

      {showModal && (
      <div
        className="fixed inset-0 bg-black/75 flex justify-center items-center z-20"
        onClick={() => setShowModal(false)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
        >
          <EventForms setShowModal={setShowModal}></EventForms>
        </div>
      </div>
    )}

    {showModalEventInfo && (
      <div
        className="fixed inset-0 bg-black/70 flex justify-center items-center z-20"
        onClick={() => setShowModalEventInfo(false)}
      >
        <div
          className="bg-white p-6 rounded-2xl shadow-2xl w-96 ml-3 mr-3 z-30"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setShowModalEventInfo(false)}
            className="text-black hover:underline ml-3 mt-4"
          >
            <FontAwesomeIcon icon={faTimes} className="text-xl" />
          </button>
          <EventDetailsForm setShowModal={setShowModalEventInfo} data={selectedData} desc={selectedDesc} ></EventDetailsForm>
        </div>
      </div>
    )}
      
    </div>
    
  );
}

export default CarDetails;