import { useState } from 'react'

import {
  LazyLoadImage,
  trackWindowScroll,
} from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import Modal from '../Modal'

export const Gallary = ({ data }) => {
  const [isModal, setIsModal] = useState(false)
  const [tempUrl, setTempUrl] = useState('')

  const handlePhotoClick = (url) => {
    setTempUrl(url)
    setIsModal(true)
  }

  return (
    <>
      {isModal && (
        <Modal
          isModal={isModal}
          setIsModal={setIsModal}
          tempUrl={tempUrl}
          setTempUrl={setTempUrl}
        />
      )}
      {data.map((photo) => (
        <div
          onClick={() => handlePhotoClick(photo.img_src)}
          key={photo.id}
          className='marsPhotoCard'
        >
          <LazyLoadImage
            src={photo.img_src}
            alt='Mars Rover Photo'
            effect='blur'
            width='100%'
            placeholderSrc={process.env.PUBLIC_URL + '/placeholder.png'}
          />
          <div className='info'>
            <p>{photo.earth_date}</p>
            <h2>{photo.camera.full_name}</h2>
          </div>
        </div>
      ))}
    </>
  )
}

export default trackWindowScroll(Gallary)
