import React, { useCallback, useState, useEffect } from "react";
import { Container, Modal } from "react-bootstrap";
import axios from "axios";

import "./App.css";
import ProductList from "./components/ProductList/ProductList";
import SortFilter from "./components/SortFilter/SortFilter";
import Header from "./components/Header/Header";
import { data } from "./list";
import closeIcon from "./assets/close.svg";

function App() {
  const [listOfProducts, setListOfProducts] = useState(data);
  const [showCart, setShowCart] = useState(false);
  const [itemsInCart, setItemsInCart] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  // const [productFilter, setProductFilter] = useState(data);

  console.log(itemsInCart);

  const filter = useCallback((filterItem) => {
    if (filterItem === "All") {
      setListOfProducts(data);
    } else {
      let temp = data.filter((item) => item.tag === filterItem);
      setListOfProducts(temp);
    }
  }, []);

  const sort = useCallback((event) => {
    console.log(event.target.value);
    let temp = [...listOfProducts];
    if (event.target.value === "asc") {
      temp.sort((a, b) => a.price - b.price);
    } else {
      temp.sort((a, b) => b.price - a.price);
    }
    setListOfProducts(temp);
  }, []);

  function addItemToCart(item, count, index) {
    if (index === null) {
      let listOfProductsTemp = [...listOfProducts];
      listOfProductsTemp.find((x) => x.id === item.id).count = count;
      setListOfProducts(listOfProductsTemp);
    } else {
      let listOfProductsTemp = [...listOfProducts];
      listOfProductsTemp[index].count = count;
      setListOfProducts(listOfProductsTemp);
    }
    let tempItem = { ...item };
    let temp = [...itemsInCart];
    tempItem.count = count;

    if (itemsInCart.filter((x) => x.id === item.id).length > 0) {
      temp.find((x) => x.id === item.id).count = count;
      setItemsInCart(temp);
    } else {
      temp.push(tempItem);
      setItemsInCart(temp);
    }
  }

  function removeItemFromCart(item, i) {
    if (itemsInCart.length === 1) {
      setShowCart(false);
    }
    if (i === null) {
      let temp = [...itemsInCart];
      let index = temp.findIndex((x) => x.id === item.id);
      temp.splice(index, 1);
      setItemsInCart(temp);
      let listOfProductsTemp = [...listOfProducts];
      index = listOfProductsTemp.findIndex((x) => x.id === item.id);
      listOfProductsTemp[index].count = null;
      setListOfProducts(listOfProductsTemp);
    } else {
      let listOfProductsTemp = [...listOfProducts];
      listOfProductsTemp[i].count = null;
      setListOfProducts(listOfProductsTemp);
      let temp = [...itemsInCart];
      let index = temp.findIndex((x) => x.id === item.id);
      temp.splice(index, 1);
      setItemsInCart(temp);
    }
  }

  return (
    <>
      <Container fluid className="sticky-top bg-white">
        <Header
          cartCount={itemsInCart.length}
          setShowCart={setShowCart}
          setShowMenu={setShowMenu}
          showMenu={showMenu}
        ></Header>
        <div className="filter-sort-container  pt-1 px-4 pb-3 align-items-center justify-content-between">
          <SortFilter filter={filter} sort={sort}></SortFilter>
        </div>
      </Container>
      {showMenu && (
        <div className="filter-sort-container-mob">
          <SortFilter filter={filter} sort={sort}></SortFilter>
        </div>
      )}
      <ProductList
        listOfProducts={listOfProducts}
        addItemToCart={addItemToCart}
        removeItemFromCart={removeItemFromCart}
      ></ProductList>
      {itemsInCart.length > 0 && showCart && (
        <Cart
          itemsInCart={itemsInCart}
          addItemToCart={addItemToCart}
          removeItemFromCart={removeItemFromCart}
          setShowCart={setShowCart}
        ></Cart>
      )}
    </>
  );
}

function Cart(props) {
  const imageStyle = {
    height: "100px",
    width: "75px",
  };
  const oldPriceStyle = {
    fontWeight: "300",
  };
  const nameStyle = {
    fontWeight: "300",
    width: "200px",
    fontSize: "14px",
  };
  const numberButtonStyle = {
    height: "20px",
    width: "20px",
    borderRadius: "50%",
    border: "1px solid",
    background: "none",
  };

  const inputWidth = {
    width: "40px",
    height: "20px",
  };

  const iconStyle = {
    float: "right",
    height: "13px",
  };
  function removeItem(index, item) {
    if (props.itemsInCart[index].count === 1) {
      props.removeItemFromCart(item, null);
    } else {
      props.addItemToCart(item, item.count - 1, null);
    }
  }

  return (
    <Modal
      show={true}
      backdrop="static"
      keyboard={false}
      centered
      className="field-quality-save-modal"
    >
      <Modal.Body
        style={{
          height: "400px",
          overflowY: "auto",
        }}
      >
        <img
          src={closeIcon}
          style={iconStyle}
          alt=""
          onClick={() => {
            props.setShowCart(false);
          }}
          className="cursor-pointer"
        ></img>
        {props.itemsInCart.map((item, index) => {
          return (
            <div
              className="product-container cursor-pointer mb-3 d-flex"
              id={"product-id-" + index}
            >
              <img
                style={imageStyle}
                src={item.image_src[0]}
                alt="images"
              ></img>
              <div className="px-3">
                <strong>{item.vendor}</strong>
                <div style={nameStyle} className="text-truncate">
                  {item.name}
                </div>
                <div className="d-flex">
                  <div>
                    <strong>${item.price}</strong>
                  </div>
                  <div className="mx-2" style={oldPriceStyle}>
                    <strike>${item.compare_at_price}</strike> (
                    {
                      Number((1 - item.price / item.compare_at_price) * 100)
                        .round
                    }
                    % OFF)
                  </div>
                </div>
                <div className="item-select d-flex pt-1 ">
                  <button
                    className="mx-2 d-flex justify-content-center align-items-center"
                    style={numberButtonStyle}
                    onClick={() => {
                      removeItem(index, item);
                    }}
                  >
                    -
                  </button>
                  <input
                    style={inputWidth}
                    value={item.count}
                    className="text-center"
                  ></input>
                  <button
                    className="mx-2 d-flex justify-content-center  align-items-center"
                    style={numberButtonStyle}
                    onClick={() => {
                      props.addItemToCart(item, item.count + 1, null);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="item-total d-flex justify-content-center  align-items-center">
                <strong>${item.price * item.count}</strong>
              </div>
            </div>
          );
        })}
      </Modal.Body>
    </Modal>
  );
}

export default App;
