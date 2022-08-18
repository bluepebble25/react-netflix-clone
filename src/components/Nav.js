import React, { useState, useEffect } from 'react';
import './Nav.css';
import { useNavigate, Link } from 'react-router-dom';
import useOnClickOutside from '../hooks/useOnClickOutside';
import { ReactComponent as SearchIcon } from '../assets/search-icon.svg';
import { useRef } from 'react';

function Nav() {
  const [isShown, setIsShown] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();
  const searchbarRef = useRef();

  useOnClickOutside(searchbarRef, () => {
    setIsSearchFocused(false);
  })

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if(window.scrollY > 50) {
        setIsShown(true);
      } else {
        setIsShown(false);
      }
    });
  
    return () => {
      window.removeEventListener('scroll', () => {});
    }
  }, []);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };

  return (
    <nav className={`nav ${isShown && "nav--color-black"}`}>
      <Link to="/">
        <img
          alt="Netflix logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png"
          className="nav__logo"
        />
      </Link>

      <div className={`nav__right-items ${isSearchFocused && "search-focused"}`}>
        <div className="search">
          <span
            className="search__search-icon"
            onClick={() => setIsSearchFocused(true)}
          >
            <SearchIcon width="24" height="24" />
          </span>
          <input
            ref={searchbarRef}
            type="text"
            value={searchValue}
            size="30"
            onChange={handleChange}
            className={`search__searchbar ${isSearchFocused && "search__bar--focused"}`}
            placeholder="검색하실 작품을 입력하세요."
          />
        </div>

        <img
          alt="User logged"
          src="https://occ-0-4796-988.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41"
          className="nav__avatar"
        />
      </div>

      
    </nav>
  )
}

export default Nav