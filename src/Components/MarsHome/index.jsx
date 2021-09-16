import React from 'react'
import { roverData } from './roverData'
import './marsHome.css'
const MarsHome = () => {
  return (
    <div className='marsHome'>
      <h1>Select Any Rover</h1>
      <div className='roverList'>
        {roverData.map((rover, i) => (
          <div key={i} className='roverCard'>
            <img src={rover.img} alt={rover.name} />
            <h2>{rover.name}</h2>
            <p>
              Status : {rover.status} , <br />
              Landed : {rover.landing_date}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MarsHome
