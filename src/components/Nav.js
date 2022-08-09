import React, { useState, useEffect } from 'react';
import './Nav.css';
import { useNavigate } from 'react-router-dom';

function Nav() {
  const [isShown, setIsShown] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

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
      <img
        alt="Netflix logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png"
        className="nav__logo"
        onClick={() => window.location.reload()}
        />

      <input
        type="text"
        value={searchValue}
        size="30"
        onChange={handleChange}
        className="nav__search"
        placeholder="검색하실 작품을 입력하세요."
      />

      <img
        alt="User logged"
        src="https://occ-0-4796-988.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41"
        className="nav__avatar"
      />
    </nav>
  )
}

export default Nav