import React, { useState, useEffect } from 'react';
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("https://testingmovieapi-l6tp.onrender.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((data) => {
          return {
            id: data._id,
            title: data.title,
            image: data.imageUrl,
            description: data.description,
            genre: data.genre, 
            director: data.director.name,
            featured: data.featured
          };
        });
  
        setMovies(moviesFromApi);
      });
  }, []);  
  

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
