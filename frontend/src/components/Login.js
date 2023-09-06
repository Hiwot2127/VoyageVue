import React, { Component } from 'react';
import "./Login.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

function Login() {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const [state, setState] = React.useState({
    email: '',
    password: '',
    error: '',
  });

  const handleInputChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = state;

    try {
      const response = await axios.post('http://localhost:3001/api/login', { email, password });

      if (response.data && response.data.message) {
        // Handle successful login
        console.log(response.data.message);
        // Redirect to '/map' upon successful login
        navigate('/map');
      } else {
        // Handle unexpected response format
        console.error('Unexpected response format:', response);
        setState({ ...state, error: 'An unexpected error occurred during login.' });
      }
    } catch (error) {
      // Handle login error
      console.error('Login failed:', error.response?.data?.message || error.message);
      setState({ ...state, error: error.response?.data?.message || 'An error occurred during login.' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Login To VoyageVue</h3>
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
      <div className="mb-3">
        <div className="custom-control custom-checkbox">
          <input type="checkbox" className="custom-control-input" id="customCheck1" />
          <label className="custom-control-label" htmlFor="customCheck1">
            Remember me
          </label>
        </div>
      </div>
      {state.error && <p className="error-message">{state.error}</p>}
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      <p className="forgot-password text-right">
        Forgot <a href="#">password?</a>
      </p>
    </form>
  );
}

export default Login;
