// src/pages/LandingPage.jsx
import { useState, useEffect } from 'react';
import Search from '../components/Search/index';
import Cart from '../components/Cart/index';
import Products from '../components/Products/Products';

function LandingPage() {
  const [cart, setCart] = useState([]);
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
      <Cart cart={cart} products={filteredProducts} setCart={setCart} />
      <Products products={filteredProducts} cart={cart} setCart={setCart} />
    </div>
  );
}

export default LandingPage;


