import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { useLocation } from 'react-router-dom';

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
      console.log(request);
      setSearchResults(request.data.results);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div></div>
  )
}

export default Searchpage