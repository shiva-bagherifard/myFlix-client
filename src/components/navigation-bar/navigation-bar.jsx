import React from 'react';
import { Navbar, Container, Nav, Row, Col, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link, Route, Routes } from "react-router-dom";
import { SearchBar } from "../search-bar/search-bar";


export const NavigationBar = ({ user, movies, handleSearch, query, onLoggedOut }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">MyFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user ? (
              <>
                <Nav.Link as={Link} to="/">Movies</Nav.Link>
                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
              </>
            )}
          </Nav>
          <Routes>
            <Route
            path="/"
            element={
              <Form inline="true">
                  <Row>
                    <Col xs="auto">
                    <SearchBar
                     handleSearch={handleSearch}
                     query={query}
                     movies={movies} />
                    </Col>
                  </Row>
              </Form>
            }
          />
          </Routes>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

NavigationBar.propTypes = {
  user: PropTypes.object.isRequired,
  query: PropTypes.string.isRequired,
  onLoggedOut: PropTypes.func.isRequired
};