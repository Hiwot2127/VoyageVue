import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    error: '',
  });

  const handleInputChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = state;

    try {
      const response = await axios.post('http://localhost:3001/api/register', {
        firstName,
        lastName,
        email,
        password,
      });

      if (response.data && response.data.message) {
        // Handle successful registration
        console.log(response.data.message);
        // Redirect to '/map' upon successful signup
        navigate('/map');
      } else {
        // Handle unexpected response format
        console.error('Unexpected response format:', response);
        setState({ ...state, error: 'An unexpected error occurred during registration.' });
      }
    } catch (error) {
      // Handle registration error
      console.error('Registration failed:', error.response?.data?.message || error.message);
      setState({ ...state, error: error.response?.data?.message || 'Registration failed.' });
    }
  };

  return (
    <div>
      <h3>Sign Up</h3>
      {state.error && <p className="error-message">{state.error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            name="firstName"
            value={state.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label>Last name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            name="lastName"
            value={state.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name="email"
            value={state.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name="password"
            value={state.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
