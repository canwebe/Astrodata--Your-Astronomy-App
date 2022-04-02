import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import Nav from './Components/Nav'
import Mars from './Pages/Mars'
import Home from './Pages/Home'
import RoverInfo from './Pages/RoverInfo'
import Search from './Pages/Search'
import SearchDetails from './Pages/SearchDetails'
const Routes = () => {
  const [searchData, setSearchData] = useState({})
  const [data, setData] = useState(null)
  return (
    <>
      <Nav setSearchData={setSearchData} />
      <Switch>
        <Route exact path='/'>
          <Home data={data} setData={setData} />
        </Route>
        <Route exact path='/mars' component={Mars} />
        <Route exact path='/mars/:rover' component={RoverInfo} />
        <Route exact path='/search'>
          <Search searchData={searchData} setSearchData={setSearchData} />
        </Route>
        <Route exact path='/search/details' component={SearchDetails} />
      </Switch>
    </>
  )
}

export default Routes
