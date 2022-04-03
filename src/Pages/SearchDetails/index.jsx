import { useEffect, useState } from 'react'
import './searchDetails.style.css'
import { MdChevronLeft } from 'react-icons/md'
import ImageLoader from '../../Components/ImageLoader'
import AudioLoader from '../../Components/AudioLoader'
import VideoLoader from '../../Components/VideoLoader'
import { Link } from 'react-router-dom'
import DataLoader from '../../Components/DataLoader'

export default function SearchDetails({ location, history }) {
  const data = location.state?.data[0]
  const url = location.state?.href

  useEffect(() => {
    if (!location.state) {
      history.push('/search')
    }
  }, [])
  return (
    <div className='search'>
      {console.log('Run in Search')}
      <div className='homeDiv'>
        <div className='wrapper searchDetailsItem'>
          <h1>{data.title}</h1>
          <p className='date'>
            {new Date(data.date_created).toLocaleDateString()}
          </p>
          {console.log(data)}
        </div>
      </div>
      <div className='searchDetails'>
        <div className='wrapper'>
          <button onClick={() => history.goBack()}>
            <MdChevronLeft />
            Back To Results
          </button>

          <h3>{data.media_type.toUpperCase()}</h3>
          {data?.album && (
            <div className='albumWrapper'>
              {data.album.map((item) => (
                <Link to={{ pathname: '/search', state: item }}>{item}</Link>
              ))}
            </div>
          )}
        </div>

        <DataLoader
          description={data.description}
          keywords={data.keywords}
          url={url}
          flag={data.media_type}
        />
      </div>
    </div>
  )
}
