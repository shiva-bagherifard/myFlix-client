import React from 'react';
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export const UpdateUser = ({ formData, handleUpdate, handleSubmit, handleDeleteAccount }) => {
    return (
        <Row>
            <Form onSubmit={handleSubmit}>
                <h3>Update profile information</h3>
                <Form.Group className='mb-2'>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"  // Add name attribute
                        minLength={4}
                        value={formData.username}
                        onChange={(e) => handleUpdate(e)}
                    />
                </Form.Group>
                <Form.Group className='mb-2'>
                    <Form.Label>Password:
                        <p>Your new password must be at least 8 characters long.</p>
                    </Form.Label>
                    <Form.Control
                        type="password"
                        name="password"  // Add name attribute
                        minLength={8}
                        value={formData.password}
                        onChange={(e) => handleUpdate(e)}
                        required
                    />
                </Form.Group>
                <Form.Group className='mb-2'>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"  // Add name attribute
                        value={formData.email}
                        onChange={(e) => handleUpdate(e)}
                    />
                </Form.Group>
                <Form.Group className='mb-4'>
                    <Form.Label>Birthdate:</Form.Label>
                    <Form.Control
                        type="date"
                        name="birthDate"  // Add name attribute
                        value={formData.birthDate ? formData.birthDate.slice(0, 10) : ''}
                        onChange={(e) => handleUpdate(e)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Submit Changes</Button>
                <Button
                    onClick={() => handleDeleteAccount()}
                    variant="outline-secondary"
                    className="mx-3"
                >
                    Delete account
                </Button>
            </Form>
        </Row>
    );
}

UpdateUser.propTypes = {
    formData: PropTypes.object.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleDeleteAccount: PropTypes.func.isRequired
};
