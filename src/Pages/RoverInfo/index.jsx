import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import './roverInfo.css'
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md'
const api_key = process.env.REACT_APP_API

const RoverInfo = ({ location, match }) => {
  const { rover } = match.params
  const { cameras, max_sol } = location.state
  const [data, setData] = useState([])
  const [camera, setCamera] = useState('')
  const [sol, setSol] = useState(parseInt(max_sol))
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const solRef = useRef()

  const fetchPhotos = () => {
    setIsLoading(true)
    fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&page=${page}${
        camera && `&camera=${camera}`
      }&api_key=${api_key}`
    )
      .then((json) => json.json())
      .then((res) => {
        console.log(res)
        setData(res.photos)
        setIsLoading(false)
      })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setSol(solRef.current.value)
  }

  const scrollRef = useRef()

  const handlePage = (dir) => {
    setPage((prev) => prev + dir)
    scrollRef.current.scrollIntoView()
  }

  const handleSol = (dir) => {
    setPage(1)
    setSol((prev) => prev + dir)
  }

  useEffect(() => {
    fetchPhotos()
  }, [camera, sol, page])

  return (
    <>
      <div className='mars'>
        <div ref={scrollRef} className='homeDiv marsDiv'>
          <div className='flexItem'>
            <h1 className='roverDataHeadline'>{rover.toUpperCase()}</h1>
            <p className='maxSol'>
              Max Sol : <span>{max_sol}</span>
            </p>
            <select
              onChange={(e) => setCamera(e.target.value)}
              value={camera}
              className='cameraOptions'
            >
              <option value=''>All</option>
              {cameras.map((camera) => (
                <option key={camera.id} value={camera.name.toLowerCase()}>
                  {camera.full_name}
                </option>
              ))}
            </select>
            <form onSubmit={handleSearch} className='searchDiv'>
              <input
                required
                ref={solRef}
                type='text'
                placeholder='Enter Sol'
              />
              <button className='cameraBtn'>Search</button>
            </form>
          </div>
        </div>
        <div className='solControl'>
          <button
            className='leftBtn'
            disabled={sol === 0}
            onClick={() => handleSol(-1)}
          >
            <MdNavigateBefore />
          </button>
          <h1>Sol : {sol}</h1>
          <button
            className='rightBtn'
            disabled={sol === max_sol}
            onClick={() => handleSol(1)}
          >
            <MdNavigateNext />
          </button>
        </div>

        <div className='roverWrapper wrapper'>
          {isLoading ? (
            <p className='loadingMars'>Please wait data is loading...</p>
          ) : data.length === 0 ? (
            <h2>No Photos Found</h2>
          ) : (
            data.map((photo) => (
              <div key={photo.id} className='marsPhotoCard'>
                <img src={photo.img_src} alt='mars rover' />
                <div className='info'>
                  <p>{photo.earth_date}</p>
                  <h2>{photo.camera.full_name}</h2>
                </div>
              </div>
            ))
          )}
        </div>

        <div className='nextPage'>
          {page !== 1 && (
            <button disabled={page === 1} onClick={() => handlePage(-1)}>
              Prev Page
            </button>
          )}
          <p>{page}</p>
          {data.length === 25 && (
            <button onClick={() => handlePage(1)}>Next Page</button>
          )}
        </div>
      </div>
    </>
  )
}

export default RoverInfo
