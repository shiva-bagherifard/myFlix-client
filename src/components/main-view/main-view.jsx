import React, { useState, useEffect } from 'react';
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import  Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';


export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://testingmovieapi-l6tp.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id.$oid,
            title: movie.title,
            image: movie.imageUrl,
            description: movie.description,
            genre: movie.genre,
            director: movie.director.name,
            featured: movie.featured
          };
        });

        setMovies(moviesFromApi);
      });
  }, [token]);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleBackClick = () => {
    setSelectedMovie(null);
  };

  return (
    <Row className="justify-content-md-center"> 
      {!user ? (
        <Col md={5}>
        <LoginView onLoggedIn={(user) => setUser(user)} />
        or
        <SignupView />
      </Col>
      ) : selectedMovie ? (
        <Col md={8} style={{ border: "1px solid black" }}>
        <MovieView 
        style={{ border: "1px solid green" }}
          movie={selectedMovie} 
          onBackClick={() => setSelectedMovie(null)} 
        />
        </Col>
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
          {movies.map((movie) => (
            <Col key={movie.id} md={3} className="mb-5">
            <MovieCard
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
            </Col>
          ))}
          <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
        </>
      )}
    </Row>
  );
};
