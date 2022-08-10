import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';

function DetailPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function fetchMovieData() {
      const request = await axios.get(
        `/movie/${movieId}`
      );
      setMovie(request.data)
    };

    fetchMovieData();
  }, []);
  
  if(!movie || !movie.backdrop_path) {
    return <div>...loading</div>
  }

  return (
    <section>
      <img
        style={{ width: "100%", display: "block" }}
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt="poster"
      />
    </section>
  )
}

export default DetailPage