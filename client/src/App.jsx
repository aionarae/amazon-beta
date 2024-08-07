// src/App.jsx
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header/index';
import Footer from './components/Footer/index';
import Products from './components/Products/Products'; 
import './App.css';
//import LandingPage from './pages/LandingPage';

function App() {
  const [cart, setCart] = useState([]);
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
        <Products cart={cart} setCart={setCart} />{/* Add the Products component here */}
      <Footer />
    </>
  );
}

export default App;
