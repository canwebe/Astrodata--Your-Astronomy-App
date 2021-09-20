import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { roverData } from './roverData'
import './mars.css'
const api_key = process.env.REACT_APP_API
const Mars = () => {
  const [roverData, setRoverData] = useState([])

  const fetchRover = () => {
    fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=${api_key}`)
      .then((json) => json.json())
      .then((res) => {
        setRoverData(res.rovers)
        console.log(roverData)
      })
  }

  useEffect(() => {
    fetchRover()
  }, [])

  return (
    <div className='mars'>
      {console.log(roverData)}
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
                to={{
                  pathname: `mars/${rover.name.toLowerCase()}`,
                  state: {
                    cameras: rover.cameras,
                    max_sol: rover.max_sol,
                  },
                }}
                key={i}
                className='roverCard'
              >
                {/* <img src={rover.img} alt={rover.name} /> */}
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
