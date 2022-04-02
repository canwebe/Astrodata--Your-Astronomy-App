import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './nav.css'

const Nav = ({ setSearchData }) => {
  return (
    <>
      <div className='nav'>
        <Link to='/'>
          <p>AstroData</p>
        </Link>
      </div>
      <div className='navLink'>
        <NavLink
          onClick={() => setSearchData([])}
          exact
          activeClassName='selected'
          to='/'
        >
          Space
        </NavLink>
        <NavLink
          onClick={() => setSearchData([])}
          activeClassName='selected'
          to='/mars'
        >
          Mars
        </NavLink>
        <NavLink activeClassName='selected' to='/search'>
          Search
        </NavLink>
      </div>
    </>
  )
}

export default Nav
