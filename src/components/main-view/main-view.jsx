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
    const [filteredMovies, setFilteredMovies] = useState([]);

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
                    setFilteredMovies(moviesFromApi);
                })
                .catch(error => console.error('Error fetching movies:', error));
        }
    }, [token]);

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = movies.filter((movie) =>
            movie.title.toLowerCase().includes(query.toLowerCase()) ||
            movie.genre.toLowerCase().includes(query.toLowerCase()) ||
            movie.director.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredMovies(filtered);
    };

    const handleLogin = (loggedInUser, token) => {
        setUser(loggedInUser);
        setToken(token);
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        localStorage.setItem("token", token);
    };

    const handleLogout = () => {
        setUser(null);
        setToken(null);
        localStorage.clear();
    };

    return (
        <BrowserRouter>
            <NavigationBar
                user={user}
                query={searchQuery}
                handleSearch={handleSearch}
                onLoggedOut={handleLogout}
                movies={movies}
                setFilteredMovies={setFilteredMovies}
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
                            !user ? <Navigate to="/login" replace /> : filteredMovies.length === 0 ? <Col>The list is empty!</Col> : <Col md={8}><MovieView movies={filteredMovies} /></Col>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            !user ? <Navigate to="/login" replace /> : filteredMovies.length === 0 ? <Col>The list is empty!</Col> : filteredMovies.map((movie) => (
                                <Col className="mb-5" key={movie.id} md={3} sm={12}>
                                    <MovieCard
                                        movie={movie}
                                        isFavorite={user && user.favoriteMovies && user.favoriteMovies.includes(movie.title)}
                                        onFavoriteChange={(updatedFavorites) => {
                                            setUser((prevUser) => ({
                                                ...prevUser,
                                                favoriteMovies: updatedFavorites
                                            }));
                                        }}
                                    />
                                </Col>
                            ))
                        }
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
