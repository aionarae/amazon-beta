import { useState, useEffect } from 'react'
import Header from './components/Header/index'
import Search from './components/Search/index'
import Menu from './components/Menu/index'
import Card from './components/General/index'
import Cart from './components/Cart/index'
import Footer from './components/Footer/index'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('Home')

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      // case 'Home' :
      //   return cards and products
      case 'Account':
        return <Account />
      case 'Orders':
        return <SkillList />
      case 'Projects':
        return <Resume />
      default:
        return <div className='products'>
        {productArray ? productArray.map((product, index) => {
          return <Card key={index} product={product} />
        }) : ''}
      </div>
    }
  }

  const [productArray, setProductArray] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/")
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
      <Menu onPageChange = {handlePageChange}/>
      <div> {renderPage()} </div>
      <Cart />
      <Footer />
    </>
  )
}

export default App
