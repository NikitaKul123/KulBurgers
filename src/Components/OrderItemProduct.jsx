import React from 'react'

const OrderItemProduct = ({product}) => {
  return (
    <div className="order-product-container">
      <div className="order-product-img">
        <img src={product.url} alt="order-product-img" />
      </div>
      <div className="order-product-text title">{product.title}</div>
      <div className="order-product-text description">
        {product.description}
      </div>
      <div className="order-product-text price">₽ {product.price}</div>
    </div>
  )
}

export default OrderItemProduct