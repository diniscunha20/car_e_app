import Avatar from '../components/Avatar';
import NavBar from '../components/NavBar';

function User() {
  return (
    <>
      <Avatar name={localStorage.getItem('username') || 'Guest'} ChangeAccount={() => {
      console.log("Switch account");
      }}/>
      <NavBar />
    </>
  );
}

export default User;