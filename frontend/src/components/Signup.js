import React, { Component } from 'react';
import axios from 'axios';

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = this.state;

    // Make a POST request to your backend for registration
    axios
      .post('/api/register', { firstName, lastName, email, password })
      .then((response) => {
        // Handle successful registration
        console.log(response.data.message);
        // Redirect or set authentication state as needed
      })
      .catch((error) => {
        // Handle registration error
        console.error('Registration failed:', error);
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Sign Up</h3>
        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label>Last name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button> 
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
    );
  }
}
