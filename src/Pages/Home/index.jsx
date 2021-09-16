import React, { useEffect, useState } from 'react'
import './home.css'
const api_key = process.env.REACT_APP_API

const Home = () => {
  const [data, setData] = useState(null)
  const [date, setDate] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  //Functions
  const fetchData = async () => {
    const json = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${api_key}`
    )
    const response = await json.json()
    setData(response)
    setIsLoading(false)
  }

  const handleDate = async (e) => {
    setIsLoading(true)
    setDate(e.target.value)
    const json = await fetch(
      `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${api_key}`
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
          <input value={date} onChange={handleDate} type='date' />
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
              <a href={data.hdurl} rel='noopener noreferrer'>
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
