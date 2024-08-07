import Search from '../components/Search/index'
import Menu from '../components/Menu/index'
import Card from '../components/General/index'
import Cart from '../components/Cart/index'
import { useState } from 'react';

function LandingPage() {
  const [cart, setCart] = useState([]);
  return (
    <div>
      <h1>Welcome to the landing page!</h1>
      <Search />
      {/* <Menu /> */}
      <Cart  cart={cart} setCart={setCart} />
    </div>
  );
}

export default LandingPage;