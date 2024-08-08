import {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faUser, faShoppingCart, faHome } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Auth from '../../utils/auth';

// Header component definition
export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // useNavigate hook to programmatically navigate to different routes
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(Auth.loggedIn());
  }, []);

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
        {isLoggedIn && (
        <button onClick={handleUserSettingsClick}>
          <FontAwesomeIcon icon={faCogs} />
          <FontAwesomeIcon icon={faUser} />
        </button>
        )}
        <button onClick={handleCartClick}>
          <FontAwesomeIcon icon={faShoppingCart} />
        </button>
        <div className="auth-buttons">
        {!isLoggedIn && (
          <>
        <button onClick={handleLoginClick} className="auth-button">
          Login
        </button>
        <button onClick={handleSignUpClick} className="auth-button">
          Sign Up
        </button>
          </>
        )}
        {isLoggedIn && (
        <button onClick={Auth.logout} className="auth-button">
          Logout
        </button>
        )}
      </div>
      </div>
    </header>
  );
}
