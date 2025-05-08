import { useState } from 'react';
import Avatar from '../components/Avatar';
import NavBar from '../components/NavBar';
import UserCard from '../components/UserCard';
import ReportProblemModal from '../components/ReportProblemModal'; // ajusta o path se necessário

function User() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button 
        onClick={() => window.history.back()} 
        className="text-black hover:underline ml-6 mt-4"
      >
        &lt;
      </button>

      <h1 className="text-4xl text-black font-bold mt-8 ml-6">Perfil</h1>

      <Avatar 
        name={localStorage.getItem('username') || 'Guest'} 
        ChangeAccount={() => console.log("Switch account")} 
      />

      <div className="flex flex-col items-center justify-center mt-15">
        <UserCard name='Informações da Conta' />
        <UserCard name='Histórico de Marcações' />
        <UserCard 
          name='Comunicar problema' 
          onClick={() => setShowModal(true)} // ✅ abre o modal
        />
        <UserCard name='Acessibilidade' />
      </div>


      <NavBar />

      {showModal && (
      <div
        className="fixed inset-0 bg-black/70 flex justify-center items-center z-20"
        onClick={() => setShowModal(false)}
      >
        <div className="flex justify-center items-center"           onClick={(e) => e.stopPropagation()}
        >
          <ReportProblemModal 
            isOpen={showModal} 
            onClose={() => setShowModal(false)}
            />

        </div>
      </div>
    )}
    
    </>
  );
}

export default User;
