import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Nav from './Components/Nav'
import Date from './Pages/Date'
import Home from './Pages/Home'
const Routes = () => {
  return (
    <>
      <Nav />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/date' component={Date} />
      </Switch>
    </>
  )
}

export default Routes
