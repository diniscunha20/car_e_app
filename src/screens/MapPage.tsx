import NavBar from '../components/NavBar'
import MapComponent from '../components/MapComponent'
import React from 'react'
import "../assets/css/Map.css"
import "../App.css"

function MapPage() {
  return (<>
    <div className='map-page'>
      <MapComponent/>
      <NavBar/>
    </div>
  </>)


}

export default MapPage