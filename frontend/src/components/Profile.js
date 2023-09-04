import React, { Component } from 'react';
import axios from 'axios';


export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: 'prow',
      lastName: 'immanuel',
      email: 'immanuel@example.com',
      newPassword: '',
      confirmPassword: '',
      isEditingPassword: false,
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  togglePasswordEditing = () => {
    this.setState((prevState) => ({
      isEditingPassword: !prevState.isEditingPassword,
    }));
  };

  handlePasswordSubmit = (event) => {
    event.preventDefault();
    // Add password update logic here
    const { newPassword, confirmPassword } = this.state;

    if (newPassword === confirmPassword) {
      // Update the password
      console.log('Password updated successfully');
    } else {
      console.error('Passwords do not match');
    }
  }; 

  render() {
    const { firstName, lastName, email, isEditingPassword } = this.state;

    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <h3>Profile</h3>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={`${firstName} ${lastName}`}
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    readOnly
                  />
                </div>
                <button
                  className="btn btn-primary"
                  onClick={this.togglePasswordEditing}
                >
                  {isEditingPassword ? 'Cancel' : 'Change Password'}
                </button>
                {isEditingPassword && (
                  <form onSubmit={this.handlePasswordSubmit}>
                    <div className="mb-3">
                      <label>New Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="newPassword"
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label>Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="confirmPassword"
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Update Password
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
