import {
  LazyLoadImage,
  trackWindowScroll,
} from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

export const Gallary = ({ data, scrollPosition }) => {
  return data.map((photo) => (
    <div key={photo.id} className='marsPhotoCard'>
      <LazyLoadImage
        src={photo.img_src}
        alt='Mars Rover Photo'
        effect='blur'
        scrollPosition={scrollPosition}
        width='100%'
      />
      <div className='info'>
        <p>{photo.earth_date}</p>
        <h2>{photo.camera.full_name}</h2>
      </div>
    </div>
  ))
}

export default trackWindowScroll(Gallary)
