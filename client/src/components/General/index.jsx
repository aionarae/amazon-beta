

export default function Card( {product} ) {
  return (
    <>
      <div className='card'>
        <h2 className='product-name'>{product.name}</h2>
        <div>
          <img className='product-image' src={product.image} alt={product.name} />
          <p className='product-description'>{product.description}</p>
        </div>
        <p className='product-price'>${product.price}</p>
        <div className='buttons'>
          <button className='cart-button'>Add to Cart</button>
          <button className='buy-button'>Buy Now</button>
        </div>
      </div>
    </>
  )
}