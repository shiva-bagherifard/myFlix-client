import React, { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
        "_id": {"$oid":"66140a6f6f2ea9b08b16c9b5"},
        "title":"Inception",
        "description":"A thief who enters the dreams of others to steal secrets from their subconscious.",
        "genre":"Science Fiction",
        "director":{"name":"Christopher Nolan","bio":"Renowned British-American film director, producer, and screenwriter. One of the highest-grossing directors in history."},
        "imageUrl":"https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg",
        "featured":true
      },
      {
        "_id": {"$oid":"66140a6f6f2ea9b08b16c9b6"},
        "title":"The Shawshank Redemption",
        "description":"Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        "genre":"Drama",
        "director":{"name":"Frank Darabont","bio":"Frank Darabont is a Hungarian-American film director, screenwriter, and producer."},
        "imageUrl":"https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg",
        "featured":true
      },
      {
        "_id": {"$oid":"66140a6f6f2ea9b08b16c9b7"},
        "title":"The Godfather",
        "description":"The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        "genre":"Crime",
        "director":{"name":"Francis Ford Coppola","bio":"Francis Ford Coppola is an American film director, producer, and screenwriter. He is widely acclaimed as one of Hollywood's greatest filmmakers."},
        "imageUrl":"https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg",
        "featured":false
      }
  ]);

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
