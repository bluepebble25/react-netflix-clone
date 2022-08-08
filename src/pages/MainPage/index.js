import React from 'react';
import genres from '../../data/genres';
import Banner from '../../components/Banner';
import Row from '../../components/Row';

function MainPage() {
  return (
    <div>
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
    </div>
  )
}

export default MainPage