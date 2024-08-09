import { useState, useEffect } from 'react';
import Cart from '../Cart/index';
import { set } from 'mongoose';

const Products = ({ cart, setCart, setProducts }) => {
  const [products, updateProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Log data to ensure title exists
        updateProducts(data);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

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
    setCart((prevCart) => [...prevCart, product.id]);
    console.log('Added to cart:', product);
  };

  return (
    <div className="products-container">
      <h1>Product List</h1>
      {products.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div className="products-grid">
          {products.map(product => (
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

