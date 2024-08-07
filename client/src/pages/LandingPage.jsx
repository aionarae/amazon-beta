import Search from '../components/Search/index'
import Menu from '../components/Menu/index'
import Card from '../components/General/index'
import Cart from '../components/Cart/index'

function LandingPage() {
  return (
    <div>
      <h1>Welcome to the landing page!</h1>
      <Search />
      <Menu />
      <Cart />
    </div>
  );
}

export default LandingPage;