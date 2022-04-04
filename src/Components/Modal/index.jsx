import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { MdClose } from 'react-icons/md'
import './modal.style.css'

export default function Modal({ isModal, setIsModal, tempUrl, setTempUrl }) {
  const handleClose = (e) => {
    if (e.target.tagName !== 'IMG') {
      setTempUrl('')
      setIsModal(false)
    }
  }
  return (
    <div onClick={handleClose} className={`modal ${isModal ? 'visible' : ''}`}>
      <span onClick={() => setIsModal(false)} className='closeIcon'>
        <MdClose />
      </span>
      <LazyLoadImage
        src={tempUrl}
        alt='Mars Rover Photo'
        effect='blur'
        width='100%'
        placeholderSrc={process.env.PUBLIC_URL + '/placeholder.png'}
      />
    </div>
  )
}
