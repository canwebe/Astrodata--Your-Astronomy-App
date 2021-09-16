import React from 'react'
import { Route, Switch } from 'react-router-dom'
import MarsHome from '../../Components/MarsHome'
import './mars.css'

const Mars = () => {
  return (
    <div className='mars'>
      <div className='homeDiv'>
        <div>
          <h1>Mars Rovers Photo Data</h1>
        </div>
      </div>
      <div className='wrapper'>
        <Route path='/' component={MarsHome} />
        {/* <Route path='/' component={MarsHome} /> */}
      </div>
    </div>
  )
}

export default Mars
