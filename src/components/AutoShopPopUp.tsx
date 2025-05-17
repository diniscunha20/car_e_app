import React from 'react';
import AppointementForms from './AppointementForms';
import { useState } from 'react';
import { Oficina } from '../assets/Props';


interface BottomPopupProps {
  visible: boolean;
  onClose: () => void;
  content: string;
}

const AutoShopPopUp: React.FC<BottomPopupProps> = ({ visible, onClose, content}) => {
  const [showModal, setShowModal] = useState(false);

  if (!visible) return null;
  
  // Parse the string content back into an Oficina object
  let oficina: Oficina | null = null;
  try {
    oficina = JSON.parse(content) as Oficina;
    console.log("Oficina:",oficina)
  } catch (e) {
    console.error("Error parsing oficina content", e);
  }

  return (
    <div
        className="h-full bg-black/50 fixed bottom-0 left-0 right-0 shadow-lg border-tz-100 "
        onClick={onClose}
    >
        <div className="h-6/10 bg-neutral-900 fixed bottom-0 left-0 right-0 rounded-t-3xl border-b-67 border-white"
        onClick={(e) => e.stopPropagation()}>

            <div className="flex-col justify-between items-center p-4 h-full justify-center items-center">
                <div className='h-7/10 w-full'>
                    <div className='h-3/20 mt-4 rounded-3xl bg-white flex flex-row '>
                        <div className='w-6/10 text-black flex items-center justify-center'>
                            <h1 className='font-bold'>{oficina?.nome}</h1>
                        </div>

                        <div className='w-4/10 bg-orange-300 rounded-r-3xl items-center flex justify-center'>
                            <div className="flex items-center space-x-1 text-orange-400 text-xl">
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                                <span className="text-gray-400">☆</span>
                                <span className="text-gray-400">☆</span>
                            </div>
                        </div>
                    </div>

                    <div className='h-14/20 mt-2 flex flex-row '>
                        <div className='flex-col w-1/2'>
                            <div className='h-5/10 flex-col'>
                                <h1 className='text-white text-2xl font-bold'>Serviços:</h1>
                                {oficina?.servicos?.map((servico, index) => (
                                  <h2 key={index} className="text-white ml-10">
                                    {servico}
                                  </h2>
                                ))}

                            </div>

                            <div className='h-4/10 flex-col mt-13'>
                                <h1 className='text-white text-2xl font-bold'>Horários:</h1>
                                <h2 className='text-white ml-10'>{oficina?.horario}</h2>
                            </div>

                        </div>

                        <div className='h-full flex justify-end w-1/2 mt-10'>
                            <img
                                src={oficina?.imagem_url}
                                className="w-9/10 h-9/10 border-2 border-white object-cover rounded-xl left-10"
                            />
                            
                        </div>
                    </div>
                </div>
                <button 
                onClick={() => setShowModal(true)}
                className="ml-5 mt-15 bg-white text-black font-bold px-2 py-3 rounded-full shadow-lg w-9/10">Fazer marcação</button>
            </div>
        </div>
        {showModal && (
      <div
        className="fixed inset-0 bg-black/70 flex justify-center items-center z-20"
        onClick={() => setShowModal(false)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
        >
          <AppointementForms></AppointementForms>
        </div>
      </div>
    )}
    </div>
  );
};

export default AutoShopPopUp;
