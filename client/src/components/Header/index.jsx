import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faUser, faShoppingCart, faHome } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

// Header component definition
export default function Header() {
  // useNavigate hook to programmatically navigate to different routes
  const navigate = useNavigate();

  // Function to handle click event on the shopping cart icon
  const handleCartClick = () => {
    navigate('/cart'); // Navigate to the cart page
  };

  // Function to handle click event on the user settings button
  const handleUserSettingsClick = () => {
    navigate('/accountinfo'); // Navigate to the account info page
  };

  // Function to handle click event on the home icon
  const handleHomeClick = () => {
    navigate('/'); // Navigate to the landing page
  };

  // Function to handle click event on the login button
  const handleLoginClick = () => {
    navigate('/login'); // Navigate to the login page
  };

  // Function to handle click event on the sign-up button
  const handleSignUpClick = () => {
    navigate('/signup'); // Navigate to the sign-up page
  };

  return (
    <header>
      <img src='/public/assets/logo.png' alt='Amazon Logo' />
      <div className="header-buttons">
        <button onClick={handleHomeClick}>
          <FontAwesomeIcon icon={faHome} />
        </button>
        <button onClick={handleUserSettingsClick}>
          <FontAwesomeIcon icon={faCogs} />
          <FontAwesomeIcon icon={faUser} />
        </button>
        <button onClick={handleCartClick}>
          <FontAwesomeIcon icon={faShoppingCart} />
        </button>
        <button onClick={handleLoginClick} className="auth-button">
          Login
        </button>
        <button onClick={handleSignUpClick} className="auth-button">
          Sign Up
        </button>
      </div>
    </header>
  );
}
