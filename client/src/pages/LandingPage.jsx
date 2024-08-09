
import { useOutletContext } from 'react-router-dom';
import Search from '../components/Search/index'
import Menu from '../components/Menu/index'
import Card from '../components/General/index'
import Cart from '../components/Cart/index'
import Products from '../components/Products/Products'
import { useState, useEffect } from 'react';

function LandingPage() {
  const {cart, setCart} = useOutletContext();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Fetch all products when the component mounts
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  // Filter products based on search term and selected category
  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  // Handle search term and category changes
  const onSearch = (term, category) => {
    setSearchTerm(term);
    setSelectedCategory(category);
  };

  return (
    <div>
      <h1>Welcome to the landing page!</h1>
      <Search onSearch={onSearch} />
      <Products products={filteredProducts} cart={cart} setCart={setCart} setProducts={setProducts} />
    </div>
  );
}

export default LandingPage;


