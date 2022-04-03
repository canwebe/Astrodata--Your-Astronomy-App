import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import SearchList from '../../Components/SearchList'
import './search.style.css'

export default function Search({
  searchData,
  setSearchData,
  filter,
  setFilter,
}) {
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isBtnLoading, setIsBtnLoading] = useState(false)
  const [isReady, setIsReady] = useState(true)

  const location = useLocation()

  const handleSearch = async (e) => {
    e.preventDefault()
    setIsBtnLoading(true)
    setFilter('')
    await fetcher()
    setIsBtnLoading(false)
  }

  const handleFilter = (e) => {
    const currentFilter = e.target.value
    setFilter(currentFilter)
    if (currentFilter) {
      const newLink = `https://images-api.nasa.gov/search?q=${query}&media_type=${currentFilter}`
      fetcher(newLink)
    }
  }

  const handlePage = (link) => {
    if (filter) {
      fetcher(link + `&media_type=${filter}`)
    } else {
      fetcher(link)
    }
  }

  const fetcher = async (
    link = `https://images-api.nasa.gov/search?q=${query}`
  ) => {
    setIsLoading(true)
    try {
      const res = await fetch(link)
      const data = await res.json()
      console.log(isReady)
      if (isReady) {
        setSearchData(data?.collection)
        setIsLoading(false)
      }
    } catch (error) {
      console.log('Something went wrong!', error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (location?.state) {
      setSearchData([])
      const customlink = `https://images-api.nasa.gov/album/${location.state}`
      fetcher(customlink)
    }
    return () => setIsReady(false)
  }, [])

  return (
    <div className='search'>
      {console.log('Run in Search', location)}
      <div className='homeDiv'>
        <div className='searchFlexItem'>
          <h1>Search any query</h1>
          <form onSubmit={handleSearch} className='searchDiv'>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              required
              type='text'
              placeholder='Eg: Apollo 11'
            />
            <button disabled={isBtnLoading} type='submit' className='cameraBtn'>
              {isBtnLoading ? 'Loading' : 'Search'}
            </button>
          </form>
        </div>
      </div>
      <div className='wrapper'>
        <div className='searchHome'>
          {!isLoading ? (
            searchData?.metadata?.total_hits ? (
              <>
                <div className='searchResultWrapper'>
                  <p className='searchResult'>
                    Found <span>{searchData.metadata.total_hits}</span> Results
                  </p>
                  <select onChange={handleFilter} value={filter} name='filter'>
                    <option value=''>All</option>
                    <option value='image'>Images</option>
                    <option value='video'>Videos</option>
                    <option value='audio'>Audios</option>
                  </select>
                </div>

                {console.log(searchData)}
                <SearchList data={searchData.items} />
                <div className='searchBtnDiv'>
                  {searchData.links &&
                    searchData.links.map((btn) => (
                      <button
                        key={btn.prompt}
                        onClick={() => handlePage(btn.href)}
                      >
                        {btn.rel}
                      </button>
                    ))}
                </div>
              </>
            ) : (
              searchData?.metadata?.total_hits === 0 && (
                <p className='loadingMars'>No Data Found</p>
              )
            )
          ) : (
            <p className='loadingMars'>Please wait data is loading...</p>
          )}
        </div>
      </div>
    </div>
  )
}
