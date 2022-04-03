import { useState, useRef, useCallback } from 'react'
import {
  LazyLoadImage,
  trackWindowScroll,
} from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { Link } from 'react-router-dom'
import './searchList.style.css'

const SearchList = ({ data, scrollPosition }) => {
  //Pagination
  const [quantity, setQuantity] = useState(15)
  const currentData = data.slice(0, quantity)

  const observer = useRef(null)
  const lastElement = useCallback((node) => {
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        console.log('Hit it')
        if (data.length > quantity) {
          setQuantity((prev) => prev + 15)
        }
      }
    })

    if (node) observer.current.observe(node)
  }, [])

  return (
    <>
      <div className='searchLists'>
        {currentData.map((item, i) => (
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
              {i + 1 === quantity ? (
                <p ref={lastElement}>
                  {new Date(item.data[0].date_created).toLocaleDateString()}
                </p>
              ) : (
                <p>
                  {new Date(item.data[0].date_created).toLocaleDateString()}
                </p>
              )}
              <p className='media'>{item.data[0].media_type.toUpperCase()}</p>
            </div>
          </Link>
        ))}
        {/* {data.length > quantity && (
          <button
            className='loadMore'
            onClick={() => setQuantity((prev) => prev + 15)}
          >
            Load More
          </button>
        )} */}
      </div>
    </>
  )
}

export default trackWindowScroll(SearchList)
