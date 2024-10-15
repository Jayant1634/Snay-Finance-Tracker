import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { API_URL } from '../services/api';
import registerImage from '../images/register.jpg';  // Adjust the path according to your folder structure
import './Register.css'; // Custom CSS for further styling

function Register() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post(API_URL + '/users/register', {
        name,
        username,
        password,
      });
      alert('User registered successfully');
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError('Failed to register user');
    }
  };

  return (
    <Container fluid className="register-page">
      <Row className="vh-100">
        {/* Left side with image */}
        <Col md={6} className="d-none d-md-block register-image">
          <img src={registerImage} alt="Register Visual" className="img-fluid" />
        </Col>

        {/* Right side with registration form */}
        <Col md={6} className="d-flex justify-content-center align-items-center">
          <div className="register-box shadow-lg p-4 rounded bg-white">
            <h2 className="text-center text-primary mb-4">Register</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleRegister}>
              <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter your name"
                  className="py-2"
                />
              </Form.Group>
              <Form.Group controlId="formBasicUsername" className="mt-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Choose a username"
                  className="py-2"
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="py-2"
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100 mt-4 py-2">
                Register
              </Button>
              <div className="mt-3 text-center">
                <Button
                  variant="link"
                  className="no-underline"
                  onClick={() => navigate('/login')}
                >
                  Already have an account? Login here
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
