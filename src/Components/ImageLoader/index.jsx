import { useState, useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/opacity.css'

export default function ImageLoader({ description, keywords, url }) {
  const [assetData, setAssetData] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    const res = await fetch(url)
    const json = await res.json()
    console.log(json)
    const final = json.find((item) => item.includes('orig.'))
    setAssetData(final)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <>
      {isLoading ? (
        <p className='loadingMars'>Please wait data is loading...</p>
      ) : (
        <>
          {assetData && (
            <LazyLoadImage
              src={assetData}
              alt='Original Photo'
              effect='opacity'
              placeholderSrc={process.env.PUBLIC_URL + '/placeholder.png'}
            />
          )}
          <div className='wrapper'>
            <p className='description'>{description}</p>
            <p>
              {keywords &&
                keywords.map((keyword) => (
                  <span key={keyword} className='tag'>
                    #{keyword} ,
                  </span>
                ))}
            </p>
          </div>
        </>
      )}
    </>
  )
}
