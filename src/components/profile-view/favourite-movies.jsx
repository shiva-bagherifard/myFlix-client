import React from 'react';
import PropTypes from "prop-types";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MovieCard } from '../movie-card/movie-card';
import { Link } from 'react-router-dom';

export const FavouriteMovies = ({ user, favoriteMovies, onFavoriteChange }) => {
  const handleFavoriteChange = (updatedFavorites) => {
    // Update local state with updatedFavorites
    onFavoriteChange(updatedFavorites);
  };

  return (
    <Row>
      <Col md={12}>
        <h3>My Movies</h3>
      </Col>
      {favoriteMovies.length > 0 ? (
        <Row>
          {favoriteMovies.map((movie) => (
            <Col className="mb-5" key={movie._id} md={4}>
              <Link to={`/movies/${movie.title}`}>
                <MovieCard
                  movie={movie}
                  isFavorite={user.favoriteMovies.includes(movie.title)}
                  onFavoriteChange={handleFavoriteChange}
                />
              </Link>
            </Col>
          ))}
        </Row>
      ) : (
        <Col md={12}>
          <p>No favorite movies found.</p>
        </Col>
      )}
    </Row>  
  );
}

FavouriteMovies.propTypes = {
  favoriteMovies: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  onFavoriteChange: PropTypes.func.isRequired
};

export default FavouriteMovies;
