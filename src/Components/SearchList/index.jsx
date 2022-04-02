import {
  LazyLoadImage,
  trackWindowScroll,
} from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { Link } from 'react-router-dom'
import './searchList.style.css'

const SearchList = ({ data, scrollPosition }) => {
  return (
    <div className='searchLists'>
      {data.map((item, i) => (
        <Link
          to={{
            pathname: '/search/details',
            state: item,
          }}
          key={i}
          className='searchCard'
        >
          <h2>{item.data[0].title}</h2>
          {item.links &&
            item.links.map(
              (img, i) =>
                img?.rel === 'preview' && (
                  <LazyLoadImage
                    key={i}
                    src={item.links[0].href}
                    alt={item.links[0].rel}
                    effect='blur'
                    scrollPosition={scrollPosition}
                  />
                )
            )}
          <div className='searchCardBottom'>
            <p>{new Date(item.data[0].date_created).toLocaleDateString()}</p>
            <p className='media'>{item.data[0].media_type.toUpperCase()}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default trackWindowScroll(SearchList)
