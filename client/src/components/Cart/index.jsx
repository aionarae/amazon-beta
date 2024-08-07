import { useState, useEffect } from "react";
import { FaSearch } from 'react-icons/fa';
import {loadStripe} from '@stripe/stripe-js';

export default function Cart() {
    const [cart, setCart] = useState([]);
    const [productArray, setProductArray] = useState([]);
    const [total, setTotal] = useState(0);
    
    useEffect(() => {
        fetch("https://fakestoreapi.com/products/")
        .then((response) => response.json())
        .then((data) => {
            setProductArray(data);
        });
    }, []);
    
    useEffect(() => {
        let total = 0;
        cart.forEach((id) => {
        const product = productArray.find((product) => product.id === id);
        total += product.price;
        });
        setTotal(total);
    }, [cart, productArray]);
    
    const removeFromCart = (id) => {
        setCart(cart.filter((productId) => productId !== id));
    };

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
            return (
                <div key={id} className="cart-item">
                <h3>{product.title}</h3>
                <p>${product.price}</p>
                <button onClick={() => removeFromCart(id)}>Remove</button>
                </div>
            );
            })}
        </div>
        <h3>Total: ${total}</h3>
        <button onClick={makePayment}> Checkout </button>
        </div>
    );
}
export default Cart;
