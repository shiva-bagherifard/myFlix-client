import React, { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleBackClick = () => {
    setSelectedMovie(null);
  };

  if (selectedMovie) {
    return (
      <MovieView 
        movie={selectedMovie}
        onBackClick={handleBackClick}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div> 
      {movies.map((movie) => (
        <MovieCard
          key={movie._id.$oid}
          movie={movie}
          onMovieClick={handleMovieClick}
        />
      ))}
    </div>
  );
};
