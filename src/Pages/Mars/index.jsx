import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './mars.css'
import Curiosity from './roverPhoto/curiosity.jpg'
import Spirit from './roverPhoto/sprit.jpg'
import Opportunity from './roverPhoto/oportunity.jpg'
import Perseverance from './roverPhoto/perseverance.webp'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
const imgs = [Curiosity, Spirit, Opportunity, Perseverance]
const api_key = process.env.REACT_APP_API

const Mars = () => {
  const [roverData, setRoverData] = useState([])

  const fetchRover = () => {
    fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=${api_key}`)
      .then((json) => json.json())
      .then((res) => {
        setRoverData(res.rovers)
      })
      .catch((err) => {
        console.log('Fething rover failed', err)
      })
  }

  useEffect(() => {
    fetchRover()
  }, [])

  return (
    <div className='mars'>
      <div className='homeDiv marsDiv'>
        <div>
          <h1 className='roverH1'>Select Any Rover</h1>
        </div>
      </div>
      <div className='wrapper'>
        <div className='marsHome'>
          {roverData.length ? (
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
                  <LazyLoadImage src={imgs[i]} alt={rover.name} effect='blur' />

                  <div className='roverDetails'>
                    <h2>{rover.name}</h2>
                    <p>
                      Status : {rover.status} , <br />
                      Landed : {rover.landing_date}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className='loadingMars'>Please wait data is loading...</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Mars
