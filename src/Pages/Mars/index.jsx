import React from 'react'
import { Link } from 'react-router-dom'
import { roverData } from './roverData'
import './mars.css'

const Mars = () => {
  return (
    <div className='mars'>
      <div className='homeDiv marsDiv'>
        <div>
          <h1>Select Any Rover</h1>
        </div>
      </div>
      <div className='wrapper'>
        <div className='marsHome'>
          <div className='roverList'>
            {roverData.map((rover, i) => (
              <Link
                to={`mars/${rover.name.toLowerCase()}`}
                key={i}
                className='roverCard'
              >
                <img src={rover.img} alt={rover.name} />
                <h2>{rover.name}</h2>
                <p>
                  Status : {rover.status} , <br />
                  Landed : {rover.landing_date}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mars
