// src/components/Header/index.jsx
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faUser, faShoppingCart, faHome } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Cart from '../Cart/index';
import Auth from '../../utils/auth';
import Search from '../Search/index';

const Header = ({ cart, setCart, onSearch }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(Auth.loggedIn());
  }, []);

  const handleCartClick = () => setIsCartModalOpen(true);
  const closeCartModal = () => setIsCartModalOpen(false);

  const handleUserSettingsClick = () => navigate('/accountinfo');
  const handleHomeClick = () => navigate('/');
  const handleLoginClick = () => navigate('/login');
  const handleSignUpClick = () => navigate('/signup');

  return (
    <header>
      <img src='/public/assets/logo.png' alt='Amazon Logo' />
      <Search onSearch={onSearch} /> {/* Ensure onSearch is passed correctly */}
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
          {!isLoggedIn ? (
            <>
              <button onClick={handleLoginClick} className="auth-button">Login</button>
              <button onClick={handleSignUpClick} className="auth-button">Sign Up</button>
            </>
          ) : (
            <button onClick={Auth.logout} className="auth-button">Logout</button>
          )}
        </div>
      </div>
      {isCartModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeCartModal}>&times;</span>
            <Cart cart={cart} setCart={setCart} />
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
