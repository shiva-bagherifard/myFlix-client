import React from "react";
import Button from "react-bootstrap/Button";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.image} style={{ height: 'auto' }} className="w-100" alt="Movie Poster" />
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
        <span>Director: </span>
        <span>{movie.director}</span>
      </div>
      <div>
        <span>Featured: </span>
        <span>{movie.featured ? "True" : "False"}</span>
      </div>
      <Button variant="primary" onClick={onBackClick}>
        Back
      </Button>
    </div>
  );
};
