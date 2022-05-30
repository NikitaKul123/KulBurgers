import React, { useState, useEffect } from "react";
import { auth, fs } from "../Config/Config";
import { Navbar } from "./Navbar";
import OrderItem from "./OrderItem";

const OrderList = () => {
  const [user, setUser] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getUserData();
    getTotalproducts();
    getUserOrders();
  }, []);

  useEffect(() => {
    getUserOrders();
  }, [user]);

  const getUserData = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection("users")
          .doc(user.uid)
          .get()
          .then((snapshot) => {
            setUser({ uid: user.uid, ...snapshot.data() });
          });
      } else {
        setUser(null);
      }
    });
  };

  const getTotalproducts = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection("Cart " + user.uid).onSnapshot((snapshot) => {
          const qty = snapshot.docs.length;
          setTotalProducts(qty);
        });
      }
    });
  };

  const getUserOrders = async () => {
    console.log(user.uid);
    const orders = await fs
      .collection("Buyer-Personal-Info")
      .where("UserId", "==", user.uid)
      .get();
    const ordersArray = [];
    for (var snap of orders.docs) {
      var data = snap.data();
      data.ID = snap.id;
      ordersArray.push({
        ...data,
      });
      if (ordersArray.length === orders.docs.length) {
        setOrders(ordersArray);
      }
    }
  };

  console.log(user);
  console.log(orders);

  return (
    <>
      <Navbar
        user={user !== null ? user.FullName : ""}
        totalProducts={totalProducts}
      />
      <div className="Containerr">
        <div className="order-item-list-container">
          {orders.length !== 0 &&
            orders.map((order) => <OrderItem order={order} forOrderList />)}
        </div>
      </div>
    </>
  );
};

export default OrderList;
