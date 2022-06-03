import React, { useState, useEffect } from "react";
import { IndividualProduct } from "./IndividualProduct.js";
import { storage, fs } from "../Config/Config";
import OrderItem from "./OrderItem.jsx";
import { Link } from "react-router-dom";

export const AddProducts = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const [imageError, setImageError] = useState("");

  const [successMsg, setSuccessMsg] = useState("");
  const [uploadError, setUploadError] = useState("");

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const types = ["image/jpg", "image/jpeg", "image/png", "image/PNG"];

  const [dasboardType, setDasboardType] = useState("orders");

  useEffect(() => {
    getProducts();
    getOrder();
  }, []);

  console.log(orders);

  const getProducts = async () => {
    const products = await fs.collection("Products").get();
    const productsArray = [];
    for (var snap of products.docs) {
      var data = snap.data();
      data.ID = snap.id;
      productsArray.push({
        ...data,
      });
      if (productsArray.length === products.docs.length) {
        setProducts(productsArray);
      }
    }
  };

  const getOrder = async () => {
    const orders = await fs.collection("Buyer-Personal-Info").get();
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

  const deleteProduct = (id) => {
    fs.collection("Products")
      .doc(id)
      .delete()
      .then(() => {
        setProducts(products.filter((product) => product.ID !== id));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleProductImg = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && types.includes(selectedFile.type)) {
        setImage(selectedFile);
        setImageError("");
      } else {
        setImage(null);
        setImageError("Выберите тип изображения (png или jpg)");
      }
    } else {
      console.log("Выберите файл");
    }
  };

  const handleAddProducts = (e) => {
    e.preventDefault();
    // console.log(title, description, price);
    // console.log(image);
    const uploadTask = storage.ref(`product-images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (error) => setUploadError(error.message),
      () => {
        storage
          .ref("product-images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            fs.collection("Products")
              .add({
                title,
                description,
                category,
                price: Number(price),
                url,
              })
              .then(() => {
                setSuccessMsg("Продукт успешно добавлен");
                setTitle("");
                setDescription("");
                setCategory("");
                setPrice("");
                document.getElementById("file").value = "";
                setImageError("");
                setUploadError("");
                setTimeout(() => {
                  setSuccessMsg("");
                }, 3000);
              })
              .catch((error) => setUploadError(error.message));
          });
      }
    );
  };

  return (
    <div className="Containerrr">
      <div className="settings-button-2">
        <button className="settings-button" onClick={() => setDasboardType("add")}>Добавить</button>
        <button className="settings-button" onClick={() => setDasboardType("delete")}>Удалить</button>
        <button className="settings-button" onClick={() => setDasboardType("orders")}>Заказы</button>
        <Link className='settings-button' to="/">Главная страница</Link> 
      </div>
      {dasboardType === "add" && (
        <div className="container">
          <br></br>
          <br></br>
          <h1>Добавление продуктов</h1>
          <hr></hr>
          {successMsg && (
            <>
              <div className="success-msg">{successMsg}</div>
              <br></br>
            </>
          )}
          <form
            autoComplete="off"
            className="form-group"
            onSubmit={handleAddProducts}
          >
            <label>Название продукта</label>
            <input
              type="text"
              className="form-control"
              required
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            ></input>
            <br></br>
            <label>Описание продукта</label>
            <input
              type="text"
              className="form-control"
              required
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            ></input>
            <br></br>
            <label>Цена продукта</label>
            <input
              type="number"
              className="form-control"
              required
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            ></input>
            <br></br>
            <label>Категории Меню</label>
            <select
              className="form-control"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Категории Меню</option>
              <option>Комбо</option>
              <option>Ланч боксы</option>
              <option>Бургеры</option>
              <option>Напитки</option>
              <option>Десерты</option>
              <option>Соусы</option>
              <option>Картошка Наггетсы</option>
            </select>
            <br></br>
            <label>Загрузить изображение</label>
            <input
              type="file"
              id="file"
              className="form-control"
              required
              onChange={handleProductImg}
            ></input>

            {imageError && (
              <>
                <br></br>
                <div className="error-msg">{imageError}</div>
              </>
            )}
            <br></br>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button type="submit" className="btn btn-dark btn-md">
                Отправить
              </button>
            </div>
          </form>
          {uploadError && (
            <>
              <br></br>
              <div className="error-msg">{uploadError}</div>
            </>
          )}
        </div>
      )}
      {dasboardType === "delete" && (
        <div className="delete-product-container">
          {products.map((product) => (
            <IndividualProduct
              key={product.ID}
              individualProduct={product}
              deleteProduct={deleteProduct}
              forAdminDashbord
            />
          ))}
        </div>
      )}
      {dasboardType === "orders" && (
        <div>
          {orders && orders.map((order) => (
            <OrderItem order={order} />
          ))}
        </div>
      )}
    </div>
  );
};
