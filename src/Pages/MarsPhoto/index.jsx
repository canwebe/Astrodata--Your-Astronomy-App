import React from 'react'
import './marsPhot.css'
const MarsPhoto = ({ match, location }) => {
  const { params } = match
  const { sol, camname } = location.state
  return (
    <div className='mars marsPhoto'>
      <div className='homeDiv marsDiv'>
        <div className='marsPhotoHeader'>
          <h1>{params.rover}</h1>
          <h2>{camname}</h2>

          <div className='searchDiv'>
            <input type='text' placeholder='Enter Sol for Search' />
            <button>Search</button>
          </div>
          <p>Sol Max Range 0 - {sol}</p>
        </div>
      </div>
    </div>
  )
}

export default MarsPhoto
