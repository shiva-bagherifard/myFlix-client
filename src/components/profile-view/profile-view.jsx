import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { UpdateUser } from './update-user';
import PropTypes from "prop-types";
import { UserInfo } from './user-info';
import { FavouriteMovies } from './favourite-movies';

export const ProfileView = ({ localUser, movies, token }) => {
  const [user, setUser] = useState(localUser);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    birthDate: '',
  });
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    if (localUser) {
      setUser(localUser);
      setFormData({
        username: localUser.username,
        email: localUser.email,
        password: localUser.password,
        birthDate: localUser.birthDate,
      });
    }
  }, [localUser]);

  useEffect(() => {
    if (!token || !user.username) {
      return;
    }

    fetch(`https://testingmovieapi-l6tp.onrender.com/users/${user.username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to fetch user data');
      })
      .then((userData) => {
        setUser(userData);
        const favMovies = movies.filter((m) => userData.favoriteMovies.includes(m.title));
        setFavoriteMovies(favMovies);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token, user.username, movies]);

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`https://testingmovieapi-l6tp.onrender.com/users/${user.username}`, {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Update failed');
      })
      .then((updatedUser) => {
        alert('Update successful');
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      })
      .catch((error) => {
        alert(error.message);
        console.error(error);
      });
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      fetch(`https://testingmovieapi-l6tp.onrender.com/users/${user.username}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (response.ok) {
            alert('Account deleted successfully.');
            localStorage.clear();
            window.location.reload();
          } else {
            alert('Something went wrong.');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleFavoriteChange = (updatedFavorites) => {
    const updatedFavMovies = movies.filter((m) => updatedFavorites.includes(m.title));
    setFavoriteMovies(updatedFavMovies);

    fetch(`https://testingmovieapi-l6tp.onrender.com/users/${user.username}`, {
      method: 'PUT',
      body: JSON.stringify({ ...user, favoriteMovies: updatedFavorites }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to update favorite movies');
      })
      .then((updatedUser) => {
        // Optionally update state or inform user
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container className="mx-1">
      <Row>
        <Card className="mb-5">
          <Card.Body>
            <Card.Title>My Profile</Card.Title>
            <Card.Text>
              {user && <UserInfo name={user.username} email={user.email} />}
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="mb-5">
          <Card.Body>
            <UpdateUser
              formData={formData}
              handleUpdate={handleUpdate}
              handleSubmit={handleSubmit}
              handleDeleteAccount={handleDeleteAccount}
            />
          </Card.Body>
        </Card>
      </Row>
      <Row>
        <Col className="mb-5" xs={12} md={12}>
          <FavouriteMovies
            user={user}
            favoriteMovies={favoriteMovies}
            onFavoriteChange={handleFavoriteChange}
          />
        </Col>
      </Row>
    </Container>
  );
};

ProfileView.propTypes = {
  localUser: PropTypes.object.isRequired,
  movies: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired,
};

export default ProfileView;
