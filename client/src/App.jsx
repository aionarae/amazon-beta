import { useState, useEffect } from 'react'
import Header from './components/Header/index'
import Search from './components/Search/index'
import Menu from './components/Menu/index'
import Card from './components/General/index'
import Cart from './components/Cart/index'
import Footer from './components/Footer/index'
import './App.css'

function App() {
  const [productArray, setProductArray] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=100")
      .then((response) => response.json())
      .then((data) => {
        setProductArray(data.results);
      });

      console.log(productArray);
  }, []);

  return (
    <>
      <Header />
      <Search />
      <Menu />
      <div className='products'>
        {productArray ? productArray.map((product, index) => {
          return <Card key={index} product={product} />
        }) : ''}
      </div>
      <Cart />
      <Footer />
    </>
  )
}

export default App
