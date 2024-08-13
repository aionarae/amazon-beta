import { useState, useEffect } from 'react';
import { useFilter } from '../Context/FilterContext';
import Cart from '../Cart/index';

const Products = ({ cart, setCart }) => {
  const { searchTerm, selectedCategory } = useFilter(); // Use context
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data); // Set initial products
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    const filtered = products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, [setCart]);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Function to add a product to the cart
  const handleAddToCart = (product) => {
    setCart(prevCart => [...prevCart, product.id]);
    console.log('Added to cart:', product);
  };

  const handleBuyNow = (product) => {
    console.log('Buy now clicked for:', product);
  };

  return (
    <div className="products-container">
      <h1>Product List</h1>
      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.title} className="product-image" />
              <h2 className="product-title">{product.title}</h2>
              <p className="product-price">${product.price.toFixed(2)}</p>
              <div className="product-buttons">
                <button
                  className="product-button add-to-cart"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
                <button
                  className="product-button buy-now"
                  onClick={() => handleBuyNow(product)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
