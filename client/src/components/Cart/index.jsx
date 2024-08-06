import { useState, useEffect } from "react";
import { FaSearch } from 'react-icons/fa';

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
        <FaSearch />
        </div>
    );
}
export default Cart;
