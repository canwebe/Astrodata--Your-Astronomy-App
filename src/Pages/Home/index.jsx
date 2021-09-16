import React, { useEffect, useState, useRef } from 'react'
import './home.css'
const api_key = process.env.REACT_APP_API

const Home = () => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const dateRef = useRef()

  //Functions

  const fetchData = async () => {
    setIsLoading(true)
    const json = await fetch(
      `https://api.nasa.gov/planetary/apod?date=${dateRef.current.value}&api_key=${api_key}`
    )
    const response = await json.json()
    setData(response)
    setIsLoading(false)
  }

  //Side Effects
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='home'>
      <div className='homeDiv'>
        <div>
          <h1>Change date for different Photo Of The Day</h1>
          <input ref={dateRef} onChange={fetchData} type='date' />
        </div>
      </div>
      <div className='wrapper'>
        {isLoading ? (
          <div className='loadingDiv'>Loading Please Wait...</div>
        ) : (
          data !== null && (
            <div className='apodData'>
              <h3>{data.date}</h3>
              <h2>{data.title}</h2>
              <a target='_blank' href={data.hdurl} rel='noopener noreferrer'>
                <img src={data.url} alt={data.title} />
              </a>

              <p>{data.explanation}</p>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default Home
