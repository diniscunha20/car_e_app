import CarCard from '../components/CarCard'
import NavBar from '../components/NavBar'
import '../App.css'
import carrosData from '../assets/carros.json'

function HomePage() {
  const carros = carrosData.carros;

  return (<>
    <h1 className = 'text-2xl font-light text-left text-black'>Welcome,</h1>
    <h1 className = 'text-4xl font-extrabold text-left text-black mb-3'>{localStorage.getItem('username') || 'Guest'}</h1>
  
    {carros.map((carro, index) => (
    
        <CarCard key={index} carro={carro}/>
      
    ))}
    <NavBar/>
    {/* <Avatar name = 'tira tira que eu vou cagar'/> */}
  </>)


}

export default HomePage

