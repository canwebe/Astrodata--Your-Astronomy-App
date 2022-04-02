import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import SearchList from '../../Components/SearchList'
import './search.style.css'
export default function Search({ searchData, setSearchData }) {
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isBtnLoading, setIsBtnLoading] = useState(false)
  const location = useLocation()

  const handleSearch = async (e) => {
    setIsBtnLoading(true)
    e.preventDefault()
    await fetcher()
    setIsBtnLoading(false)
  }
  const handlePage = async (link) => {
    setIsLoading(true)
    await fetcher(link)
    setIsLoading(false)
  }

  const fetcher = async (
    link = `https://images-api.nasa.gov/search?q=${query}`
  ) => {
    try {
      const res = await fetch(link)
      const data = await res.json()
      console.log(data)
      setSearchData(data?.collection)
    } catch (error) {
      console.log('Something went wrong!', error)
    }
  }

  useEffect(() => {
    if (location?.state) {
      setSearchData([])
      const customlink = `https://images-api.nasa.gov/album/${location.state}`
      handlePage(customlink)
    }
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
                <p className='searchResult'>
                  Found <span>{searchData.metadata.total_hits}</span> Results
                </p>
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
