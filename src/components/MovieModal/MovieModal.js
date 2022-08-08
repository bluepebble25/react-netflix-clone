import React from 'react'
import './MovieModal.css';

function MovieModal({
  backdrop_path,
  title,
  overview,
  name,
  release_date,
  first_air_date,
  vote_average,
  setIsModalOpen,
}) {
  return (
    <div className="modal-wrapper">
      <div className="modal">
        <span
          className="modal__close"
          onClick={() => setIsModalOpen(false)}
        >
          X
        </span>
        
        <img
          className="modal__poster-img"
          src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
          alt="modal__poster-img"
        />

        <div className="modal__content">
          <p className="modal__details">
            <span className="modal__user-perc">100% for you</span>
            <span>{release_date ? release_date : first_air_date}</span>
          </p>

          <h2 className="modal__title">
            {title ? title : name}
          </h2>
          <p className="modal__overview">
            평점: {(Math.floor(vote_average * 10) / 10).toFixed(1)}
          </p>
          <p className="modal__overview">
            {overview}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MovieModal