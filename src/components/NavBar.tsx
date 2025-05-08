import { useNavigate, useLocation } from 'react-router-dom';
import "../assets/css/navbar.css"

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="bg-black dock dock-lg shadow-2xl p-0 h-1/13 z-100">
        
        <div className={`w-1/3 rounded-none m-0 border-r ${currentPath === '/map' ? 'border-b-3' : ''}`}
        onClick={() => navigate('/map')}>

          <button onClick={() => navigate('/map')} >
          <svg className = 'size-[2.5em]' 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" viewBox="0 0 24 24" 
          stroke-width="1.2" 
          stroke="#F8F8E0">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" /></svg>
              <span className="dock-label"></span>
          </button>
        </div>

        <div className={`w-1/3 rounded-none m-0 ${currentPath === '/' ? 'border-b-3' : ''}`}
        onClick={() => navigate('/')}>
          <button className=''  onClick={() => navigate('/')}>
          <svg className = 'size-[2.5em]' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="#F8F8E0"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
              <span className="dock-label"></span>
          </button>
        </div>

        <div className={`w-1/3 rounded-none m-0 border-l ${currentPath === '/perfil' ? 'border-b-3' : ''}`}
        onClick={() => navigate('/perfil')}>
          <button className='black-border' onClick={() => navigate('/perfil')}>
          <svg className='size-[3em]' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="#F8F8E0"><path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
              <span className="dock-label"></span>
          </button>
        </div>
    </div>
  );
}

export default NavBar;