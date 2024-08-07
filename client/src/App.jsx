// src/App.jsx
import { Outlet } from 'react-router-dom';
import Header from './components/Header/index';
import Footer from './components/Footer/index';
import Products from './components/Products/Products'; 
import './App.css';

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
        <Products /> {/* Add the Products component here */}
      <Footer />
    </>
  );
}

export default App;
