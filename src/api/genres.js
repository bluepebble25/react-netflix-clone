import requests from "./requests";

const genres = [
  {
    title: 'Netflix Original',
    id: 'NO',
    fetchUrl: requests.fetchNetflixOriginal,
  },
  {
    title: 'Trending Now',
    id: 'TN',
    fetchUrl: requests.fetchTrending,
  },
  {
    title: 'Top Rated',
    id: 'TR',
    fetchUrl: requests.fetchTopRated,
  },
  {
    title: 'Action Movies',
    id: 'AM',
    fetchUrl: requests.fetchActionMovies,
  },
  {
    title: 'Comedy Movies',
    id: 'CM',
    fetchUrl: requests.fetchComedyMovies,
  },
  {
    title: 'Horror Movies',
    id: 'HM',
    fetchUrl: requests.fetchHorrorMovies,
  },
];

export default genres