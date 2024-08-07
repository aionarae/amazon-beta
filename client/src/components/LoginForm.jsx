import React, { useState } from 'react';
import Auth from '../utils/auth'; // This will now work with default export

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Simple validation check
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setLoading(true);

    const { email, password } = userFormData;
    const isAuthenticated = Auth.login(email, password);

    if (isAuthenticated) {
      // Handle successful login
      // Redirect or update state as needed
    } else {
      setShowAlert(true);
    }

    setLoading(false);
    setUserFormData({ email: '', password: '' });
  };

  return (
    <>
      <form noValidate validated={validated.toString()} onSubmit={handleFormSubmit}>
        {showAlert && <div className="alert alert-danger">Something went wrong with your login credentials!</div>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Your email"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <div className="invalid-feedback">Email is required!</div>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <div className="invalid-feedback">Password is required!</div>
        </div>
        <button
          type="submit"
          disabled={!(userFormData.email && userFormData.password) || loading}
        >
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </>
  );
};

export default LoginForm;

