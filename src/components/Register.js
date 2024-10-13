import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';

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
      await axios.post(API_URL +  '/users/register', {
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
    <Container className="mt-5">
      <h2 className="text-center">Register</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleRegister} className="shadow p-4 rounded">
        <Form.Group controlId="formBasicName">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter your name"
          />
        </Form.Group>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Choose a username"
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
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
    </Container>
  );
}

export default Register;
