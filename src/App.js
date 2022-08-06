import './App.css';
import genres from './data/genres';
import Nav from './components/Nav';
import Banner from './components/Banner';
import Row from './components/Row';
import Footer from './components/Footer';

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
                fetchURL={genre.fetchUrl}
                isLargeRow
              />
            );
          } else {
            return (
              <Row
                key={genre.id}
                title={genre.title}
                fetchURL={genre.fetchUrl}
            />
            );
          }
        })
      }
      <Footer />
    </div>
  );
}

export default App;
