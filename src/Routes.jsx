import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import Nav from './Components/Nav'
import Mars from './Pages/Mars'
import Home from './Pages/Home'
import RoverInfo from './Pages/RoverInfo'
import Search from './Pages/Search'
import SearchDetails from './Pages/SearchDetails'
import Footer from './Components/Footer'

const Routes = () => {
  const [searchData, setSearchData] = useState({})
  const [roverData, setRoverData] = useState([])
  const [data, setData] = useState(null)
  const [filter, setFilter] = useState('')

  return (
    <>
      {console.count('Main screen')}
      <Nav setSearchData={setSearchData} />
      <Switch>
        <Route exact path='/'>
          <Home data={data} setData={setData} />
        </Route>
        <Route exact path='/mars'>
          <Mars roverData={roverData} setRoverData={setRoverData} />
        </Route>
        <Route exact path='/mars/:rover' component={RoverInfo} />
        <Route exact path='/search'>
          <Search
            searchData={searchData}
            setSearchData={setSearchData}
            filter={filter}
            setFilter={setFilter}
          />
        </Route>
        <Route exact path='/search/details' component={SearchDetails} />
      </Switch>
      <Footer />
    </>
  )
}

export default Routes
