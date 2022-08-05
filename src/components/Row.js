import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import './Row.css';

function Row({ isLargeRow, title, id, fetchURL }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovieData();

  }, []);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchURL);
    setMovies(request.data.results);
    console.log('request', request);
  };

  return (
    <section className="row">
      <h2 className="row__title">{ title }</h2>
      <div className="slider">
        <div className="slider__arrow-area slider__arrow-area--left">
          <span className="slider__arrow">{"<"}</span>
        </div>
        <div id={id} className="row__posters">
          {movies.map(movie => (
            <img
              key={movie.id}
              className={`row__poster ${isLargeRow && 'row__poster--large'}`}
              src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
              alt={movie.title}
            />
          ))}
        </div>
        <div className="slider__arrow-area slider__arrow-area--right">
          <span className="slider__arrow">{">"}</span>
        </div>
      </div>
    </section>
  )
}

export default Row