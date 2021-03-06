import React from 'react';

export const IndividualFilteredProduct = ({ individualFilteredProduct, addToCart }) => {
  const handleAddToCart = () => {
    addToCart(individualFilteredProduct);
  };

  return (
    <div className="product">
      <div className="product-img">
        <img src={individualFilteredProduct.url} alt="product-img" />
      </div>
      <div className="product-text title">{individualFilteredProduct.title}</div>
      <div className="product-text description">{individualFilteredProduct.description}</div>
      <div className="product-text price">₽ {individualFilteredProduct.price}</div>
      <div className="settings-button1" onClick={handleAddToCart}>
        Добавить в корзину
      </div>
    </div>
  );
};
