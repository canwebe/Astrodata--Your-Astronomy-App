import React, { useEffect, useState } from 'react'
import './home.css'

const Home = () => {
  const [data, setData] = useState(null)

  //Functions
  const fetchData = async () => {
    const api_key = process.env.REACT_APP_API
    const json = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${api_key}`
    )
    const response = await json.json()
    setData(response)
  }

  //Side Effects
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='home'>
      <h1>Photo Of the Day</h1>
      {data !== null && (
        <div>
          <h4>{data.date}</h4>
          <h2>{data.title}</h2>
          <a href={data.hdurl} target='_blank' rel='noopener noreferrer'>
            <img src={data.url} alt={data.title} />
          </a>
          <p>{data.explanation}</p>
        </div>
      )}
    </div>
  )
}

export default Home
