import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from '../../api/axios';

function DetailPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  const mediaType = query.get('media_type');

  // media type이 영화인지 tv show인지에 따라 경로를 다르게 해서 정보를 가져온다.
  let url = '';
  switch(mediaType) {
    case 'tv':
      url = `/tv/${movieId}`;
      break;
    case 'movie':
      url = `/movie/${movieId}`;
      break;
    default:
      url = `/movie/${movieId}`;
  }
  
  useEffect(() => {
    async function fetchMovieData() {  
      const request = await axios.get(url);
      console.log(request.data);
      setMovie(request.data)
    };

    fetchMovieData();
  }, [movieId]);
  
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