import React from 'react';
import PropTypes from "prop-types";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MovieCard } from '../movie-card/movie-card';
import { Link } from 'react-router-dom';

export const FavouriteMovies = ({ user, favoriteMovies, onFavoriteChange }) => {
  return (
    <Row>
      <Col md={12}>
        <h3>My Movies</h3>
      </Col>
      <Row>
        {favoriteMovies.map((movie,  index) => {
          return (
            <Col className="mb-5" key={index} md={4}>
              <MovieCard
                  movie={movie}
                  isFavorite={user.favoriteMovies.includes(movie.title)}
                  onFavoriteChange={onFavoriteChange} // Pass the callback
                />
            </Col>
          );
        })}
      </Row>
    </Row>  
  )
}

FavouriteMovies.propTypes = {
  favoriteMovies: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  onFavoriteChange: PropTypes.func.isRequired // Add the new prop type
};
