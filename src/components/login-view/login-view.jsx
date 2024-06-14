import React, { useState } from 'react';
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner'; // Add spinner for loading state

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading state to true

    const data = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch('https://testingmovieapi-l6tp.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log('Response Data:', responseData); // Log the response data

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(responseData.user));
        localStorage.setItem('token', responseData.token);
        onLoggedIn(responseData.user, responseData.token); // Invoking onLoggedIn
        alert('Login successful');
        setError(''); // Clear any previous error
      } else {
        throw new Error(responseData.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3"
            className="mb-4"
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Submit'} // Show spinner if loading
        </Button>
      </Form>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
