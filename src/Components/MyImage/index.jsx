import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

export default function MyImage({ src, alt }) {
  return <LazyLoadImage src={src} alt={alt} effect='blur' />
}
