import { useNavigate, useLocation } from 'react-router-dom';
import "../assets/css/navbar.css"

type NavBarIconProps = {
  icon: string;
  path: string;
};

function NavBarIcon({ icon, path }: NavBarIconProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = location.pathname === path; 

  return (
    <button
      >
        <svg
          className='size-[3em]'
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="black"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
        </svg>
        <span className="dock-label"></span>
    </button>
  );
}

export default NavBarIcon;
