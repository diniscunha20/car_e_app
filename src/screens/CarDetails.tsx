import React,{ useState }  from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import carrosData from '../assets/carros.json';
import NavBar from '../components/NavBar';
import "../assets/css/CarCard.css"
import EventForms from '../components/EventForms';
import { Carro } from '../assets/Props';







const CarDetails: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const { matricula } = useParams<{ matricula: string }>();
  const navigate = useNavigate();
  

  const stored = localStorage.getItem('carros');
  if (!stored) return <p>No data in localStorage</p>;

  const carros: Carro[] = JSON.parse(stored);

  const carro = carros.find((car) => car.matricula === matricula);

  if (!carro) {
    return <p>Car not found</p>;
  } else {
    console.log("Car from localStorage:", carro);
  }



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
        className="ml-37 w-full h-full object-cover rounded-l-3xl"
      />
    </div>

      
      <div className="relative car-details h-11/12">
            
          <div className='relative h-1/4 rounded-b-4xl'
            style={{ backgroundColor: 'rgb(250, 234, 189)' }}>
              <button 
                onClick={() => window.history.back()} 
                className="text-black hover:underline ml-3 mt-4 absolute z-40"
              >
                &lt;
              </button>

            <div className="h-full ml-2 flex flex-row">

              <div className='flex-col z-0'>

                <h2 className="card-title font-thin text-6xl ml-10 italic">
                  {carro.marca}
                </h2>

                <h1 className="card-title font-bold text-8xl italic ">
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
            
                <h2 className="text-xl font-bold mb-2 ml-3" style={{color: textColor  }}>Proximo evento </h2>

                {Object.entries(carro.eventos).slice(0, 1).map(([evento, data], index) => (
                  <div
                    className={`h-3/4 w-[95%] flex items-center rounded-r-3xl`}
                    key={evento}
                    style={{ backgroundColor: baseColor, color: textColor }}
                  >

                    <h1 className="ml-3 w-[70%]">
                      <strong>{evento}:</strong> {data}
                    </h1>

                    <button
                      className="btn border-none -ml-5 px-4 py-2 rounded-lg shadow hover:bg-indigo-700"
                      style={{ backgroundColor: brightColor, color: textColor  }}
                      onClick={() => navigate("/map")}
                    >
                      Marcar
                    </button>

                  </div>
                ))}

            </div>

            <h2 className="text-xl font-bold  ml-3 mt-10 border-t-4 py-2" style={{borderColor: textColor,color: textColor  }}>Outros </h2>
            <div className='h-[55%] overflow-y-auto'>

                {Object.entries(carro.eventos).slice(1).map(([evento, data], index) => (
                  <div
                    className={`h-1/4 mt-4 w-[95%] flex items-center ${index % 2 === 0 ? 'rounded-l-3xl ml-5' : 'rounded-r-3xl'}`}
                    key={evento}
                    style={{ backgroundColor: baseColor }}
                  >
                    <h1 className={` ${index % 2 === 0 ? 'ml-5 w-[70%]' : 'ml-10 w-[55%] '}`}>
                      <strong>{evento}:</strong> {data}
                    </h1>

                  </div>
                ))}
            </div>

            <div className='h-[5%]'>
            <div className='h-[5%] items-center flex justify-end'>
              <button
                onClick={() => setShowModal(true)}
                className=" text-3xl font-bold rounded-full size-6 shadow-lg mr-15 mt-8"
                style={{ color: baseColor, background: textColor }}
              >
                <h1 className='font-bold -mt-2'>+</h1>
              </button>
            </div>

            </div>

          </div>

        <div className='fixed'>
          <NavBar />

        </div>
      </div>
      {showModal && (
      <div
        className="fixed inset-0 bg-black/70 flex justify-center items-center z-20"
        onClick={() => setShowModal(false)}
      >
        <div
          className="h-[35%] bg-white p-6 rounded-2xl shadow-2xl w-96 ml-3 mr-3 z-30"
          onClick={(e) => e.stopPropagation()}
        >
          <EventForms carro={carro} ></EventForms>
        </div>
      </div>
    )}
      
    </div>
    
  );
}

export default CarDetails;