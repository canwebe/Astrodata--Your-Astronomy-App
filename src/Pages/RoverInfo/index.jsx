import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { roverCameraData } from '../Mars/roverData'
import './roverInfo.css'
const api_key = process.env.REACT_APP_API

const RoverInfo = ({
  match: {
    params: { rover },
  },
}) => {
  const [data, setData] = useState({})

  const fetchRover = async () => {
    const json = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}?api_key=${api_key}`
    )
    const response = await json.json()
    setData(response.rover)
  }

  useEffect(() => {
    if (rover === 'curiosity' || rover === 'perseverance') {
      fetchRover()
    } else {
      setData(roverCameraData[rover])
    }
  }, [])

  return (
    <>
      <div className='mars'>
        <div className='homeDiv marsDiv'>
          <div>
            <h1 className='roverDataHeadline'>
              Select Camera for {rover.toUpperCase()}
            </h1>
          </div>
        </div>
        <div className='wrapper'>
          {data.max_sol !== undefined &&
            data.cameras.map((camera) => (
              <Link
                className='cameraBtn'
                key={camera.name}
                to={{
                  pathname: `/mars/${rover}/${camera.name.toLowerCase()}`,
                  state: { sol: data.max_sol, camname: camera.full_name },
                }}
              >
                {camera.full_name}
              </Link>
            ))}
        </div>
      </div>
    </>
  )
}

export default RoverInfo
