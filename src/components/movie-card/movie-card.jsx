import PropTypes from "prop-types";
import { useState } from "react";
import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ movie, isFavorite, onFavoriteChange }) => {
  const storedToken = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const addToFavorites = () => {
    fetch(
      `https://testingmovieapi-l6tp.onrender.com/users/${user.username}/movies/${encodeURIComponent(movie.title)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add movie to favorites.");
        }
        return response.json();
      })
      .then((updatedUser) => {
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        onFavoriteChange(updatedUser.favoriteMovies); // Update the parent component's state
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const removeFromFavorites = () => {
    fetch(
      `https://testingmovieapi-l6tp.onrender.com/users/${user.username}/movies/${encodeURIComponent(movie.title)}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to remove movie from favorites.");
        }
        return response.json();
      })
      .then((updatedUser) => {
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        onFavoriteChange(updatedUser.favoriteMovies); // Update the parent component's state
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Link to={`/movies/${encodeURIComponent(movie.id)}`} className="movie-view">
        <Card className="h-100">
          <Card.Img variant="top" src={movie.image} className="object-fit-cover" />
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>{movie.genre}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
      <Card>
        {isFavorite ? (
          <Button variant="primary" onClick={removeFromFavorites}>
            Remove
          </Button>
        ) : (
          <Button variant="primary" onClick={addToFavorites}>
            Add
          </Button>
        )}
      </Card>
    </>
  );
};

MovieCard.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string,
    genre: PropTypes.string.isRequired,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    featured: PropTypes.bool.isRequired,
  }).isRequired,
  onFavoriteChange: PropTypes.func.isRequired, // New prop for state management
};
