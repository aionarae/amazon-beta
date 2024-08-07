import React from 'react';
import { Link } from 'react-router-dom';

export default function Menu({ isLoggedIN }) {
  return (
    <div className='menu-container'>
      <h2>Menu</h2>
      <ul className='menu-items'>
          <>
            {/* the home link is now functional */}
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/account">Account</Link></li>
            <li><Link to="/orders">Orders</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </>
      </ul>
    </div>
  );
}