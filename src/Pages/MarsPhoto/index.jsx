import React, { useEffect } from 'react'
import { useState } from 'react'
import './marsPhot.css'
const api_key = process.env.REACT_APP_API

const MarsPhoto = ({ match, location }) => {
  const [photoData, setPhotoData] = useState([])
  const { rover } = match.params
  const { sol, camname } = location.state
  const fetchPhoto = async () => {
    const json = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=${api_key}`
    )
    const data = await json.json()
    setPhotoData(data.photos)
    console.log(photoData)
  }

  useEffect(() => {
    fetchPhoto()
  }, [])
  return (
    <div className='mars marsPhoto'>
      <div className='homeDiv marsDiv'>
        <div className='marsPhotoHeader'>
          <h1>{rover}</h1>
          <h2>{camname}</h2>

          <p>Sol Max Range 0 - {sol}</p>
        </div>
      </div>
      <div>
        <h1>Photos</h1>
        {/* {photoData.length &&
          photoData.map((item) => (
            <div className='photoCard'>
              <img src={item.img_src} alt={item.earth_date} />
              <h3>{item.earth_date}</h3>
            </div>
          ))} */}
      </div>
    </div>
  )
}

export default MarsPhoto
