import './App.css';
import genres from './api/genres';
import Nav from './components/Nav';
import Banner from './components/Banner';
import Row from './components/Row';

function App() {
  return (
    <div className="App">
      <Nav />
      <Banner />
      {
        genres.map(genre => {
          if(genre.id === 'NO') {
            return (
              <Row
                key={genre.id}
                title={genre.title}
                id={genre.id}
                fetchURL={genre.fetchUrl}
                isLargeRow
              />
            );
          } else {
            return (
              <Row
                key={genre.id}
                title={genre.title}
                id={genre.id}
                fetchURL={genre.fetchUrl}
            />
            );
          }
        })
      }
    </div>
  );
}

export default App;
