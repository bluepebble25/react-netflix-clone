import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { useLocation } from 'react-router-dom';
import './SearchPage.css';

function Searchpage() {
  const [searchResults, setSearchResults] = useState([]);
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  const searchTerm = query.get("q");

  useEffect(() => {
    if(searchTerm) {
      fetchSearchedMovie(searchTerm);
    }
  }, [searchTerm]);
  
  const fetchSearchedMovie = async (searchTerm) => {
    try {
      const request = await axios.get(
        `/search/multi?include_adult=false&query=${searchTerm}`
      );
      console.log(request.data);
      setSearchResults(request.data.results);
    } catch (error) {
      console.log("error", error);
    }
  };

  const renderSearchResults = () => {
    return searchResults.length > 0 ? (
      <section className="search-container">
        {searchResults.map(movie => {
          if(movie.backdrop_path != null && movie.media_type !== "person") {
            const movieImageUrl = `https://image.tmdb.org/t/p/w300${movie.backdrop_path}`;

            return (
              <div className="movie__column" key={movie.id}>
                  <img
                    src={movieImageUrl}
                    alt={movie.title}
                    className="movie__poster"
                  />
              </div>
            );
        }
        })}
      </section>
    ) : (
      <section className="no-results">
        <div className="no-results__text">
          <p>
            찾고자 하는 검색어 "{searchTerm}"에 맞는 결과가 없습니다.
          </p>
        </div>
      </section>
    )
  };

  return renderSearchResults();
}

export default Searchpage