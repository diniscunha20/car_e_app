import CarCard from '../components/CarCard'
import NavBar from '../components/NavBar'
import '../App.css'

function HomePage() {
  return (<>
  <h1 className = 'text-2xl font-light text-left text-black'>Welcome,</h1>
  <h1 className = 'text-4xl font-extrabold text-left text-black mb-3'>Claudino.</h1>
  <CarCard name = 'Renault Clio'/>
  <CarCard name = 'Fiat Tipo'/>
  <CarCard name = 'Renault Twingo'/>
  <NavBar/>
  {/* <Avatar name = 'tira tira que eu vou cagar'/> */}
  </>)


}

export default HomePage