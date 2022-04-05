import React, { useEffect, useState, useRef } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import './home.css'
import usePWA from 'react-pwa-install-prompt'
import { MdCancel } from 'react-icons/md'

const api_key = process.env.REACT_APP_API

const Home = ({ data, setData }) => {
  const [isLoading, setIsLoading] = useState(false) //trues
  const dateRef = useRef()
  const [isPwamodal, setIsPwaModal] = useState(false)
  const { isStandalone, isInstallPromptSupported, promptInstall } = usePWA()

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

  const fetchLocal = () => {
    fetch(
      `https://api.nasa.gov/planetary/apod?date=${dateRef.current.value}&api_key=${api_key}`
    )
      .then((res) => res.json())
      .then((json) => {
        setData(json)
        localStorage.setItem('photo', JSON.stringify(json))
      })
  }

  const onClickInstall = async () => {
    const didInstall = await promptInstall()
    console.log(didInstall)
    setIsPwaModal(false)
  }

  //Side Effects
  useEffect(() => {
    let photos = localStorage.getItem('photo')
    if (photos) {
      photos = JSON.parse(photos)
      if (
        new Date().toLocaleDateString() !==
        new Date(photos.date).toLocaleDateString()
      ) {
        console.log('Date New Part')
        fetchLocal()
      } else {
        console.log('Date match part')
        setData(photos)
      }
    } else {
      console.log('New fetch Part')
      fetchLocal()
    }
  }, [])

  useEffect(() => {
    if (isInstallPromptSupported && !isStandalone) {
      setIsPwaModal(true)
    }
  }, [isInstallPromptSupported])

  return (
    <div className='home'>
      <div className='homeDiv'>
        <div>
          <h1>Change date for different Photo Of The Day</h1>
          <input
            ref={dateRef}
            placeholder='Choose Date'
            onChange={fetchData}
            type='date'
            max={new Date()}
          />
        </div>
      </div>
      <div>
        {isLoading ? (
          <p className='loadingDiv'>Loading Please Wait...</p>
        ) : data?.title ? (
          <div className='apodData'>
            <div className='wrapper'>
              <h3>{data.date}</h3>
              <h2>{data.title}</h2>
            </div>
            {data.media_type === 'video' ? (
              <iframe
                title={data.title}
                src={data.url}
                width='100%'
                // height='230px'
                className='homePlayer'
              />
            ) : (
              <a
                className='imgSpan'
                target='_blank'
                href={data.hdurl}
                rel='noopener noreferrer'
              >
                <LazyLoadImage
                  src={data.url}
                  alt={data.title}
                  effect='blur'
                  placeholderSrc={process.env.PUBLIC_URL + '/placeholder.png'}
                />
              </a>
            )}
            <div className='wrapper'>
              <p className='homeInfo'>Click the photo for Full HD Asset</p>
              <p>{data.explanation}</p>
            </div>
          </div>
        ) : (
          data?.code === 400 && (
            <p className='loadingDiv'>No data found for this Date</p>
          )
        )}
      </div>
      {isPwamodal && (
        <div className='pwaModal'>
          <span onClick={() => setIsPwaModal(false)}>
            <MdCancel />
          </span>
          <p>For faster experience Install this app</p>

          <button className='installPwa' onClick={onClickInstall}>
            Install
          </button>
        </div>
      )}
    </div>
  )
}

export default Home
