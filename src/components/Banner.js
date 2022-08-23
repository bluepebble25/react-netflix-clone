import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from '../api/axios';
import requests from '../api/requests';
import './Banner.css';
import { SkeletonBanner } from './Skeleton';

function Banner() {
  const [movie, setMovie] = useState(null);
  const [isPlayClicked, setIsPlayClicked] = useState(false);

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
    // console.log(movieDetail);
  };

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  return (
    <>
      {!movie &&
        <SkeletonBanner />
      }

      {movie &&
        (!isPlayClicked ?
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
                {movie.videos.results.length !== 0
                ? <button
                    className="banner__button banner__button--play"
                    onClick={() => setIsPlayClicked(true)}
                  >
                    Play
                  </button>
                : <button
                    className="banner__button banner__button--disabled"
                    disabled
                  >
                    Not Playable
                  </button>
                }
                <button
                  className="banner__button banner__button--info"
                >
                  More information
                </button>
              </div>
              <h2 className="banner__description">
                {truncate(movie.overview, 100)}
              </h2>
            </div>
            <div className="banner--fadeBottom"></div>
          </header>
          :
          <Container>
           <HomeContainer>
            <Iframe
              width="640"
              height="360"
              src={`https://www.youtube.com/embed/${movie.videos.results[0].key}
              ?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
              frameborder="0"
              allow="autoplay; fullscreen"
            >
            </Iframe>
          </HomeContainer>
        </Container>
        )
      }
    </>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction-column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Iframe = styled.iframe`
  display: block;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.9;
  border: none;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export default Banner