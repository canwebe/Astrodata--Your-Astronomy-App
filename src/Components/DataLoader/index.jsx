import { useState, useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/opacity.css'

export default function DataLoader({ description, keywords, url, flag }) {
  const [assetData, setAssetData] = useState('')
  const [srt, setSrt] = useState('')
  const [poster, setPoster] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    const res = await fetch(url)
    const json = await res.json()
    console.log(json)
    const final = json.find((item) => item.includes('orig.'))
    if (flag === 'video') {
      const finalSrt = json.find((item) => item.includes('.vtt'))
      const finalPoster = json.find((item) => item.includes('thumb.'))
      setPoster(finalPoster)
      setSrt(finalSrt)
    }
    setAssetData(final)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const renderLoader = () => {
    if (flag === 'image') {
      return (
        <LazyLoadImage
          src={assetData}
          alt='Original Photo'
          effect='opacity'
          placeholderSrc={process.env.PUBLIC_URL + '/placeholder.png'}
        />
      )
    } else if (flag === 'video') {
      return (
        <video
          src={assetData}
          poster={poster}
          controls
          crossOrigin='crossorigin'
        >
          {srt && (
            <track
              src={srt}
              kind='subtitles'
              srcLang='en'
              label='English'
            ></track>
          )}
        </video>
      )
    } else if (flag === 'audio') {
      return <audio src={assetData} controls width='100%'></audio>
    } else {
      return <p>No Player found</p>
    }
  }

  return (
    <>
      {isLoading ? (
        <p className='loadingMars'>Please wait data is loading...</p>
      ) : (
        <>
          {assetData && renderLoader()}
          <div className='wrapper'>
            <p className='description'>{description}</p>
            <p className='tags'>
              {keywords &&
                keywords.map((keyword) => (
                  <span key={keyword} className='tag'>
                    #{keyword}
                  </span>
                ))}
            </p>
          </div>
        </>
      )}
    </>
  )
}
