import React from "react";
import OrderItemProduct from "./OrderItemProduct";

const OrderItem = ({ order, forOrderList = false }) => {
  return (
    
    <div className="order-item-container">
      {forOrderList && (
        <>
          <div>Номер заказа: {order.UserId}</div>
          <div>Стоимость заказа: {order.CartPrice}</div>
          
        </>
      )}

      {!forOrderList && (
        <>
          <div>Имя заказчика: {order.Name}</div>
          <div>Номер телефона: {order.CellNo}</div>
          <div>Стоимость заказа: {order.CartPrice}₽</div>
          <div>Адрес заказа: {order.ResidentialAddress}</div>
          <div>Пожелания: {order.Wishes}</div>
        </>
      )}
      <div className="order-item-container-products">
        {order.Products.map((product) => (
          <OrderItemProduct product={product} />
        ))}
      </div>
    </div>
    
  );
};

export default OrderItem;
