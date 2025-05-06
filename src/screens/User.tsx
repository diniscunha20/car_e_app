import Avatar from '../components/Avatar';
import NavBar from '../components/NavBar';
import UserCard from '../components/UserCard';

function User() {
  return (
    <>
      <button 
        onClick={() => window.history.back()} 
        className="text-black hover:underline ml-6 mt-4"
      >
        &lt;
      </button>
      <h1 className="text-4xl text-black font-bold mt-8 ml-6">Perfil</h1>
      <Avatar name={localStorage.getItem('username') || 'Guest'} ChangeAccount={() => {
      console.log("Switch account");
      }}/>
      <div className="flex flex-col items-center justify-center mt-15">
        <UserCard name='Informações da Conta'/>
        <UserCard name='Histórico de Marcações'/>
        <UserCard name='Comunicar problema'/>
        <UserCard name='Acessibilidade'/>
      </div>

      <NavBar />
    </>
  );
}

export default User;