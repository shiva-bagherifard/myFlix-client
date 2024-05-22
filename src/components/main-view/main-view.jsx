import React, { useState, useEffect } from 'react';
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (token) {
            fetch("https://testingmovieapi-l6tp.onrender.com/movies", {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((response) => response.json())
                .then((data) => {
                    const moviesFromApi = data.map((movie) => ({
                        id: movie._id,
                        title: movie.title,
                        image: movie.imageUrl,
                        description: movie.description,
                        genre: movie.genre,
                        director: movie.director,
                        featured: movie.featured,
                    }));
                    setMovies(moviesFromApi);
                    localStorage.setItem("movies", JSON.stringify(moviesFromApi));
                })
                .catch(error => console.error('Error fetching movies:', error));
        }
    }, [token]);

    const handleSearch = (query) => {
        setSearchQuery(query);

        // Filter movies by title, genre, or director
        const filteredMovies = movies.filter((movie) => {
            return (
                movie.title.toLowerCase().includes(query.toLowerCase()) ||
                movie.genre.toLowerCase().includes(query.toLowerCase()) ||
                movie.director.toLowerCase().includes(query.toLowerCase())
            );
        });
        setMovies(filteredMovies);
    };

    const handleLogin = (loggedInUser, token) => {
        setUser(loggedInUser);
        setToken(token);
    };

    return (
        <BrowserRouter>
            <NavigationBar
                user={user}
                query={searchQuery}
                handleSearch={handleSearch}
                onLoggedOut={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                }}
            />
            <Row className="justify-content-md-center">
                <Routes>
                    <Route
                        path="/signup"
                        element={user ? <Navigate to="/" /> : <Col md={5}><SignupView /></Col>}
                    />
                    <Route
                        path="/login"
                        element={user ? <Navigate to="/" replace /> : <Col md={5}><LoginView onLoggedIn={handleLogin} /></Col>}
                    />
                    <Route
                        path="/movies/:movieId"
                        element={
                            !user ? <Navigate to="/login" replace /> : movies.length === 0 ? <Col>The list is empty!</Col> : <Col md={8}><MovieView movies={movies} /></Col>}
                    />
                    <Route
                        path="/"
                        element={
                            !user ? <Navigate to="/login" replace /> : movies.length === 0 ? <Col>The list is empty!</Col> : movies.map((movie) => (
                                <Col className="mb-5" key={movie.id} md={3} sm={12}>
                                    <MovieCard
                                        movie={movie}
                                        isFavorite={user && user.favoriteMovies && user.favoriteMovies.includes(movie.title)}
                                        onFavoriteChange={(updatedFavorites) => {
                                            setUser((prevUser) => ({
                                                ...prevUser,
                                                favoriteMovies: updatedFavorites
                                            }));
                                            setMovies((prevMovies) =>
                                                prevMovies.map((m) =>
                                                    updatedFavorites.includes(m.title) ? { ...m, isFavorite: true } : { ...m, isFavorite: false }
                                                )
                                            );
                                        }}
                                    />
                                </Col>
                            ))}
                    />
                    <Route
                        path="/profile"
                        element={!user ? <Navigate to="/login" replace /> : <Col md={8}><ProfileView localUser={user} movies={movies} token={token} /></Col>}
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};
