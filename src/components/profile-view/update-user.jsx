export const UpdateUser = ({ formData, handleUpdate, handleSubmit, handleDeleteAccount }) => {
    return (
        <Row>
            <Form onSubmit={handleSubmit}>
                <h3>Update profile information</h3>
                <Form.Group className='mb-3'>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        minLength={4}
                        value={formData.username}
                        onChange={(e) => handleUpdate(e)}
                        required
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Password:
                        <p>Your new password must be at least 8 characters long.</p>
                    </Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        minLength={8}
                        value={formData.password}
                        onChange={(e) => handleUpdate(e)}
                        required
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => handleUpdate(e)}
                        required
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Birthdate:</Form.Label>
                    <Form.Control
                        type="date"
                        name="birthDate"
                        value={formData.birthDate.slice(0, 10)}
                        onChange={(e) => handleUpdate(e)}
                        required
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
