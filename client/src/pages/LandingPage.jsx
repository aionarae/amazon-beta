import Search from '../components/Search/index'
import Menu from '../components/Menu/index'
import Card from '../components/General/index'
import Cart from '../components/Cart/index'
import Products from '../components/Products/Products'
import { useState } from 'react';

function LandingPage() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  return (
    <div>
      <h1>Welcome to the landing page!</h1>
      <Search />
      {/* <Menu /> */}
      <Cart  cart={cart} products={products} setCart={setCart} />
      <Products cart={cart} setCart={setCart} setProducts={setProducts} />{/* Add the Products component here */}
    </div>
  );
}

export default LandingPage;