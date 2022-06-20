import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { Products } from './Products';
import { auth, fs } from '../Config/Config';
import { IndividualFilteredProduct } from './IndividualFilteredProduct';

import { motion } from 'framer-motion';

import '../index.css';
import CarouselBox from './CarouselBox';
import Footer from './Footer';
import Modal from '../Modal/Modal';

export const Home = (props) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [modalActive, setModalActive] = useState(false);

  // getting current user uid
  function GetUserUid() {
    const [uid, setUid] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setUid(user.uid);
        }
      });
    }, []);
    return uid;
  }

  const uid = GetUserUid();

  // getting current user function
  function GetCurrentUser() {
    const [user, setUser] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          fs.collection('users')
            .doc(user.uid)
            .get()
            .then((snapshot) => {
              setUser(snapshot.data().FullName);
              setIsAdmin(snapshot.data().isAdmin ? true : false);
            });
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  }

  const user = GetCurrentUser();
  // console.log(user);

  // state of products
  const [products, setProducts] = useState([]);

  // getting products function
  const getProducts = async () => {
    const products = await fs.collection('Products').get();
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

  useEffect(() => {
    getProducts();
  }, []);

  // state of totalProducts
  const [totalProducts, setTotalProducts] = useState(0);
  // getting cart products
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection('Cart ' + user.uid).onSnapshot((snapshot) => {
          const qty = snapshot.docs.length;
          setTotalProducts(qty);
        });
      }
    });
  }, []);

  // globl variable
  let Product;

  // add to cart
  const addToCart = (product) => {
    if (uid !== null) {
      // console.log(product);
      Product = product;
      Product['qty'] = 1;
      Product['TotalProductPrice'] = Product.qty * Product.price;
      fs.collection('Cart ' + uid)
        .doc(product.ID)
        .set(Product)
        .then(() => {
          console.log('successfully added to cart');
        });
    } else {
      props.history.push('/login');
    }
  };

  // categories list rendering using span tag
  const [spans] = useState([
    { id: 'Combo', text: 'Комбо' },
    { id: 'LunchBox', text: 'Ланч боксы' },
    { id: 'Burgers', text: 'Бургеры' },
    { id: 'TheDrinks', text: 'Напитки' },
    { id: 'Desserts', text: 'Десерты' },
    { id: 'Sauces', text: 'Соусы' },
    { id: 'PotatoNuggets', text: `Картошка & Наггетсы` },
  ]);

  // active class state
  const [active, setActive] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  // category state
  const [category, setCategory] = useState('');

  // handle change ... it will set category and active states
  const handleChange = (individualSpan) => {
    setActive(individualSpan.id);
    setCategory(individualSpan.text);
    filterFunction(individualSpan.text);
  };

  // filtered products state
  const [filteredProducts, setFilteredProducts] = useState([]);

  // filter function
  const filterFunction = (text) => {
    if (products.length > 1) {
      const filter = products.filter((product) => product.category === text);
      setFilteredProducts(filter);
    } else {
      console.log('no products to filter');
    }
  };

  // return to all products
  const returntoAllProducts = () => {
    setActive('');
    setCategory('');
    setFilteredProducts([]);
  };

  const toggleMenu = () => {
    setShowMenu((state) => !state);
  };

  return (
    <>
      <Navbar user={user} totalProducts={totalProducts} isAdmin={isAdmin} />
      <CarouselBox />
      <br></br>
      <div className="container-fluid filter-products-main-box">
        <div id="mainmenu" className="dropdown">
          <h6>
            <motion.div
              initial={{
                x: -1000,
                opacity: 0,
              }}
              animate={{
                x: 0,
                zIndex: -1,
                opacity: 1,
              }}
              transition={{
                delay: 0.4,
              }}
              className="Vern">
              <button onClick={toggleMenu} class="dropbtn">
                {showMenu ? 'Скрыть меню' : 'Показать меню'}
              </button>
            </motion.div>
          </h6>

          <div className="asd">
            <main>
              <button className="open-btn" onClick={() => setModalActive(true)}>
                открыть меню
              </button>
            </main>
            <Modal active={modalActive} setActive={setModalActive}>
              <div className="dropdown-content2">
                <button onClick={returntoAllProducts} class="dropbtn-2">
                  Все меню
                </button>
                {spans.map((individualSpan, index) => (
                  <span
                    key={index}
                    id={individualSpan.id}
                    onClick={() => handleChange(individualSpan)}
                    className={individualSpan.id === active ? active : 'deactive'}>
                    {individualSpan.text}
                  </span>
                ))}
              </div>
            </Modal>
          </div>

          {showMenu && (
            <h6>
              <div className="Vern-2">
                <button onClick={returntoAllProducts} class="dropbtn-2">
                  Все меню
                </button>
              </div>
            </h6>
          )}

          {showMenu && (
            <div className="dropdown-content">
              {spans.map((individualSpan, index) => (
                <span
                  key={index}
                  id={individualSpan.id}
                  onClick={() => handleChange(individualSpan)}
                  className={individualSpan.id === active ? active : 'deactive'}>
                  {individualSpan.text}
                </span>
              ))}
            </div>
          )}
        </div>
        {filteredProducts.length > 0 && (
          <div className="my-products">
            <h1 className="text-center">{category}</h1>
            <div className="products-box">
              {filteredProducts.map((individualFilteredProduct) => (
                <IndividualFilteredProduct
                  key={individualFilteredProduct.ID}
                  individualFilteredProduct={individualFilteredProduct}
                  addToCart={addToCart}
                />
              ))}
            </div>
          </div>
        )}
        {filteredProducts.length < 1 && (
          <>
            {products.length > 0 && (
              <div className="my-products">
                <motion.h1
                  initial={{
                    x: -1000,
                    opacity: 0,
                  }}
                  animate={{
                    x: 0,
                    opacity: 0.7,
                  }}
                  transition={{
                    delay: 0.2,
                  }}
                  className="text-center">
                  Всё Меню
                </motion.h1>

                <motion.img
                  initial={{
                    x: -1000,
                    opacity: 0,
                  }}
                  animate={{
                    x: 0,
                    zIndex: -1,
                    opacity: 0.7,
                  }}
                  transition={{
                    delay: 0.2,
                  }}
                />
                <motion.div
                  initial={{
                    x: -1000,
                    opacity: 0,
                  }}
                  animate={{
                    x: 0,
                    opacity: 1,
                  }}
                  transition={{
                    delay: 0.2,
                  }}
                  className="products-box">
                  <Products products={products} addToCart={addToCart} />
                </motion.div>
              </div>
            )}
            {products.length < 1 && <div className="my-products please-wait">Подождите...</div>}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};
