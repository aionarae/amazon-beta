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

  return (
    <>
      {/* Logo image */}
      <img src='/public/assets/logo.png' alt='Amazon Logo' />
      <div>
        {/* Home button with home icon */}
        <button onClick={handleHomeClick}>
          <FontAwesomeIcon icon={faHome} />
        </button>
        {/* Toggle menu button with cogs and user icons */}
        <button onClick={handleUserSettingsClick}>
          <FontAwesomeIcon icon={faCogs} />
          <FontAwesomeIcon icon={faUser} />
        </button>
        {/* Toggle cart button with shopping cart icon */}
        <button onClick={handleCartClick}>
          <FontAwesomeIcon icon={faShoppingCart} />
        </button>
      </div>
    </>
  );
}