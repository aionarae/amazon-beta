import { useState, useEffect } from "react";
import { FaSearch } from 'react-icons/fa';
import {loadStripe} from '@stripe/stripe-js';

export default function Cart({ cart, setCart }) {
  const [productArray, setProductArray] = useState([]);
  const [total, setTotal] = useState(0);

useEffect(() => {
    fetch("https://fakestoreapi.com/products/")
    .then((response) => response.json())
    .then((data) => {
        setProductArray(data);
    })
    .catch((error) => {
        console.error("Error fetching products:", error);
    });
}, []);

useEffect(() => {
    let total = 0;
    cart.forEach((id) => {
    const product = productArray.find((product) => product.id === id);
    if (product) {
        total += product.price;
        }});
        setTotal(total);
    }, [cart, productArray]);
    
    const removeFromCart = (id) => {
    setCart(cart.filter((productId) => productId !== id));

    // adding stripe integration to the CHECKOUT button
    const makePayment = async () => {
        const stripe = await loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx')

        const body = {
            products : cart
        }

        const headers = {
            'Content-Type': 'application/json'
        }

        const response = await fetch(`${apiURL}/create-checkout-session`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        })

        const session = await response.json()

        const result = await stripe.redirectToCheckout({
            sessionId: session.id
        });

        if(result.error) {
            console.error(result.error.message)
        }
    };
    
    return (
    <div className="cart">
      <h2>Cart</h2>
      <div className="cart-items">
        {cart.map((id) => {
          const product = productArray.find((product) => product.id === id);
          return product ? (
            <div key={id} className="cart-item">
              <span>{product.title}</span>
              <span>${product.price.toFixed(2)}</span>
              <button onClick={() => removeFromCart(id)}>Remove</button>
            </div>
          ) : null;
        })}
        </div>
      <div className="cart-total">
        <h3>Total: ${total.toFixed(2)}</h3>
        <button onClick={makePayment}> Checkout </button>
      </div>
    </div>
  );
}
