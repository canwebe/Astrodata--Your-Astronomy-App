import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './nav.css'

const Nav = () => {
  return (
    <>
      <div className='nav'>
        <Link to='/'>
          <p>AstroData</p>
        </Link>
      </div>
      <div className='navLink'>
        <NavLink exact activeClassName='selected' to='/'>
          Space
        </NavLink>
        <NavLink activeClassName='selected' to='/mars'>
          Mars
        </NavLink>
      </div>
    </>
  )
}

export default Nav
