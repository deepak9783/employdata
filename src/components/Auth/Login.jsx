import React, { useState } from 'react';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { login as apiLogin } from '../../services/api';

const Login = () => {
  const [email, setEmail] = useState('eve.holt@reqres.in'); // Fixed domain
  const [password, setPassword] = useState('cityslicka');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Client-side validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      console.log('Attempting login with:', { email, password }); // Debug log
      const response = await apiLogin(email, password);
      
      if (response.data?.token) {
        login(response.data.token);
        navigate('/users');
      } else {
        throw new Error('No token received');
      }
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setError(
        err.response?.data?.error || 
        err.message || 
        'Login failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Card style={{ width: '400px' }} className="p-4 shadow">
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          
          {error && (
            <Alert variant="danger" dismissible onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                isInvalid={!!error}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                isInvalid={!!error}
              />
            </Form.Group>

            <Button 
              variant="primary" 
              type="submit" 
              className="w-100" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Logging in...
                </>
              ) : 'Login'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;



