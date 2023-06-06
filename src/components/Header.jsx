import React from 'react'
import { Link } from 'react-router-dom'
import Profile from '../assets/images/profile.svg'

import './header.scss'

export default function Header() {
  return (
    <header className='header container d-flex justify-content-between align-items-center mb-5'>
      <div className="header__title">
        <Link className='header__link' to="/books">
        Badiiyat
        </Link>
      </div>
      <div className="header__nav d-flex justify-content-between align-items-center ">
        <nav className='header__nav mr-auto'>
          <ul className='header__list'>
            <Link to="/authors" className='header__items'>Authors</Link>
            <Link to="/books" className='header__items'>Nasr</Link>
            <Link to="/books" className='header__items '>Nazm</Link>
            <Link to="/books" className='header__items '>Maqolalar</Link>
            <Link to="/books" className='header__items m-0'>Forum</Link>
          </ul>
        </nav>
      </div>
      <div className="header__profile">
          <img src={Profile} alt="profiled img" />
        </div>
    </header>
  )
}
