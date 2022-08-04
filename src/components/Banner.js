import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import requests from '../api/requests';
import './Banner.css';

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    // 현재 상영중인 영화들의 정보를 가져온다.
    const request = await axios.get(requests.fetchNowPlaying);

    // 랜덤으로 한 영화의 id를 얻는다.
    const randomNum = Math.floor(Math.random() * request.data.results.length);
    const movieId = request.data.results[randomNum].id;

    // 랜덤으로 얻은 id에 해당하는 영화의 더 자세한 정보를 가져온다.
    const {data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: {
        append_to_response: 'videos'
      }
    });
    setMovie(movieDetail);
    console.log(movieDetail);
  };

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  if(movie.length !== 0) {
    return (
      <header
        className="banner"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
          backgroundPosition: 'top center',
          backgroundSize: 'cover',
        }}
      >
        <div className="banner__contents">
          <h1 className="banner__title">
            {movie.title || movie.name || movie.original_title}
          </h1>
          <div className="banner__buttons">
            <button className="banner__button banner__button--play">Play</button>
            <button className="banner__button banner__button--info">More information</button>
          </div>
          <h2 className="banner__description">
            {truncate(movie.overview, 100)}
          </h2>
        </div>
        <div className="banner--fadeBottom"></div>
      </header>
    )
  }
}

export default Banner