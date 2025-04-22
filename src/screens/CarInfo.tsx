import NavBar from '../components/NavBar';
import Events from "../components/Events.tsx";
import carrosData from '../assets/carros.json'

function CarInfo() {
  return (
    <>
      <Events events={carrosData.carros[0].eventos}></Events>
      <NavBar />
    </>
  );
}

export default CarInfo;