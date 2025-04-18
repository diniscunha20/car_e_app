import Avatar from '../components/Avatar';
import NavBar from '../components/NavBar';

function User() {
  return (
    <>
      <h1 className='text-2xl font-light text-left text-black'>Welcome,</h1>
      <h1 className='text-4xl font-extrabold text-left text-black mb-3'>Claudino.</h1>
      <Avatar name ='tira tira que eu vou cagar' />
      <NavBar />
    </>
  );
}

export default User;