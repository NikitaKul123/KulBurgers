import React from "react";
import OrderItemProduct from "./OrderItemProduct";

const OrderItem = ({ order, forOrderList = false }) => {
  return (
    <div className="order-item-container">
      {forOrderList && (
        <>
          <div>Номер: {order.UserId}</div>
          <div>Цена: {order.CartPrice}</div>
        </>
      )}

      {!forOrderList && (
        <>
          <div>Имя заказчика: {order.Name}</div>
          <div>Номер: {order.CellNo}</div>
          <div>Цена: {order.CartPrice}</div>
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
