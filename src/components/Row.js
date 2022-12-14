import React, { useState, useEffect, useRef } from 'react';
import axios from '../api/axios';
import './Row.css';
import MovieModal from './MovieModal/MovieModal';
import { SkeletonRow } from './Skeleton';

function Row({ isLargeRow, title, fetchURL }) {
  const [movies, setMovies] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState({});

  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
      // console.log('request', request);
    };
    // setTimeout(fetchMovieData, 1000000);
    fetchMovieData();
  }, [fetchURL]);

  const handleModalOpen = (movie) => {
    setIsModalOpen(true);
    setSelectedMovie(movie);
  };

  const slideToLeft = () => {
    scrollRef.current.scrollLeft -= window.innerWidth - 80;
  };

  const slideToRight = () => {
    scrollRef.current.scrollLeft += window.innerWidth - 80;
  }

  return (
    <section className="row">
      <h2 className="row__title">{ title }</h2>
      <div className="slider">
        {
          !movies && (isLargeRow ? <SkeletonRow large /> : <SkeletonRow />)
        }
        { movies &&
          <>
            <div className="slider__arrow-area slider__arrow-area--left">
              <span
                className="slider__arrow"
                onClick={slideToLeft}
              >
                {"<"}
              </span>
            </div>
            <div className="row__posters" ref={scrollRef}>
            {movies.map(movie => (
              <img
                key={movie.id}
                className={`row__poster ${isLargeRow && 'row__poster--large'}`}
                src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                loading="lazy"
                alt={movie.title}
                onClick={() => handleModalOpen(movie)}
              />
            ))}
          </div>
          <div className="slider__arrow-area slider__arrow-area--right">
            <span
              className="slider__arrow"
              onClick={slideToRight}
            >
              {">"}
            </span>
          </div>
          </>
        }
      </div>
      {
        isModalOpen && (
          <MovieModal
            {...selectedMovie}
            setIsModalOpen={setIsModalOpen}
          />
        )
      }
    </section>
  )
}

export default Row