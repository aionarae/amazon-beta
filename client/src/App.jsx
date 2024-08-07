import { useState, useEffect } from 'react'
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import Header from './components/Header/index'

import Footer from './components/Footer/index'
import './App.css'

function App() {

  // const [cart, setCart] = useState([]);

  // const addToCart = (product) => {
  //   setCart([...cart, product.id]);
  // }
  
  // const [currentPage, setCurrentPage] = useState('Home')

  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };

  

  // const [productArray, setProductArray] = useState([]);

  // useEffect(() => {
  //   fetch("https://fakestoreapi.com/products/")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setProductArray(data.results);
  //     });

  //     console.log(productArray);
  // }, []);

  return (
    <>
      <Header />
      {/* <NavBar /> */}
      <Outlet />
      <Footer />
    </>
  )
}

export default App