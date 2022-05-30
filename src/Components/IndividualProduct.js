import React from "react";

export const IndividualProduct = ({
  individualProduct,
  addToCart,
  deleteProduct,
  forAdminDashbord = false,
}) => {
  // console.log(individualProduct);
  const handleAddToCart = () => {
    addToCart(individualProduct);
  };

  const handleDeleteProduct = () => {
    deleteProduct(individualProduct.ID);
  };
  return (
    <div className="product">
      <div className="product-img">
        <img src={individualProduct.url} alt="product-img" />
      </div>
      <div className="product-text title">{individualProduct.title}</div>
      <div className="product-text description">
        {individualProduct.description}
      </div>
      <div className="product-text price">₽ {individualProduct.price}</div>
      {forAdminDashbord ? (
        <div className="btn btn-danger" onClick={handleDeleteProduct}>
          Удалить товар
        </div>
      ) : (
        <div className="btn btn-danger" onClick={handleAddToCart}>
          Добавить в корзину
        </div>
      )}
    </div>
  );
};
