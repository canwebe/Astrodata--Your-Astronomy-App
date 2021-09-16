import React from 'react'
import { NavLink } from 'react-router-dom'
import './nav.css'

const Nav = () => {
  return (
    <>
      <div className='nav'>
        <p>AstroPhoto</p>
      </div>
      <div className='navLink'>
        <NavLink exact activeClassName='selected' to='/'>
          Space
        </NavLink>
        <NavLink exact activeClassName='selected' to='/mars'>
          Mars
        </NavLink>
      </div>
    </>
  )
}

export default Nav
