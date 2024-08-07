import { useState, useEffect } from "react";

export default function Cart({ cart = [], setCart }) {
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
                    return product ? (
                        <div key={id} className="cart-item">
                            <span>{product.title}</span>
                            <span>${product.price}</span>
                            <button onClick={() => removeFromCart(id)}>Remove</button>
                        </div>
                    ) : null;
                })}
            </div>
            <div className="cart-total">
                <h3>Total: ${total.toFixed(2)}</h3>
            </div>
        </div>
    );
}