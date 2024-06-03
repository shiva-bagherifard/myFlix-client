import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);
  // Handle case when movie is not found
  if (!movie) {
    return <div>Movie not found</div>;
  }
  return (
    <div>
      <div>
        <img src={movie.imageUrl} className="img-fluid  justify-content-md-center" alt="Movie Poster" />
      </div>
      <div>
        <span style={{fontWeight: 'bold' }}>Title: </span>
        <span style={{fontWeight: 'bold' }}>{movie.title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre}</span>
      </div>
      <div>
         {/* Access director's name properly */}
        <span>Director: </span>
        <span>{movie.director.name}</span>
      </div>
      <div>
        <span>Featured: </span>
        <span>{movie.featured ? "True" : "False"}</span>
      </div>
      <Link to={`/`}>
      <button className="back-button" >Back</button>
      </Link>
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    genre: PropTypes.string,
    director: PropTypes.string, 
  }).isRequired
  };