import React, { useCallback, useState } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";

import "./ProductList.css";

function ProductList(props) {
  const listOfProducts = props.listOfProducts;

  const [hoverId, setHoverId] = useState();
  const [selectId, setSelectId] = useState();

  // listOfProducts.forEach((item) => {
  //   console.log(item.tag);
  // });

  const imageStyle = {
    height: "300px",
    width: "225px",
  };
  const nameStyle = {
    fontWeight: "300",
    width: "200px",
    fontSize: "14px",
  };
  const oldPriceStyle = {
    fontWeight: "300",
  };
  const buttonHeight = {
    height: "40px",
  };

  const numberButtonStyle = {
    height: "30px",
    width: "30px",
    borderRadius: "50%",
    border: "1px solid",
    background: "none",
  };

  const inputWidth = {
    width: "40px",
  };

  function onHover(index) {
    if (listOfProducts[index].count) {
    } else {
      document.getElementById(
        "product-id-" + index
      ).childNodes[0].style.height = "260px";
      setHoverId(index);
    }
  }

  function onLeave(index) {
    document.getElementById("product-id-" + index).childNodes[0].style.height =
      "300px";
    setHoverId(null);
    setSelectId(null);
  }

  function addToCart(index, item) {
    document.getElementById("product-id-" + index).childNodes[0].style.height =
      "300px";

    // if (temp[index] === null) {
    //   props.changeCartCount("add");
    // }

    props.addItemToCart(item, (listOfProducts[index].count || 0) + 1, index);
  }

  function removeItem(index, item) {
    if (listOfProducts[index].count === 1) {
      props.removeItemFromCart(item, index);
      onHover(index);
    } else {
      props.addItemToCart(item, listOfProducts[index].count - 1, index);
    }
  }

  return (
    <Container fluid classname="mt-3">
      <Row className="">
        {listOfProducts.map((item, index) => {
          return (
            <Col
              key={index}
              xl={3}
              lg={3}
              md={4}
              sm={6}
              className="d-flex justify-content-center mt-3 mb-3"
            >
              <div
                className="product-container cursor-pointer"
                id={"product-id-" + index}
                onMouseEnter={() => {
                  onHover(index);
                }}
                onMouseLeave={() => {
                  onLeave(index);
                }}
              >
                <img
                  style={imageStyle}
                  src={item.image_src[0]}
                  alt="images"
                ></img>
                {hoverId === index && !item.count && selectId !== index && (
                  <div className="size-container px-3 pt-2">
                    <div>
                      <strong>select size</strong>
                    </div>
                    <div className="d-flex justify-content-between mt-2">
                      <div
                        className="circle d-flex justify-content-center align-items-center"
                        onClick={() => {
                          setSelectId(index);
                        }}
                      >
                        38
                      </div>
                      <div
                        className="circle d-flex justify-content-center align-items-center"
                        onClick={() => {
                          setSelectId(index);
                        }}
                      >
                        39
                      </div>
                      <div
                        className="circle d-flex justify-content-center align-items-center"
                        onClick={() => {
                          setSelectId(index);
                        }}
                      >
                        40
                      </div>
                      <div
                        className="circle d-flex justify-content-center align-items-center"
                        onClick={() => {
                          setSelectId(index);
                        }}
                      >
                        44
                      </div>
                      <div
                        className="circle d-flex justify-content-center align-items-center"
                        onClick={() => {
                          setSelectId(index);
                        }}
                      >
                        46
                      </div>
                    </div>
                  </div>
                )}
                {hoverId === index && selectId === index && !item.count && (
                  <div className="button-container d-flex justify-content-center mt-3 mb-3">
                    <Button
                      style={buttonHeight}
                      variant="outline-dark"
                      onClick={() => {
                        addToCart(index, item);
                      }}
                    >
                      ADD TO CART
                    </Button>
                  </div>
                )}
                {item.count && (
                  <div className="item-select d-flex pt-3 justify-content-center ">
                    <button
                      className="mx-2 d-flex justify-content-center "
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
                      className="mx-2 d-flex justify-content-center "
                      style={numberButtonStyle}
                      onClick={() => {
                        addToCart(index, item);
                      }}
                    >
                      +
                    </button>
                  </div>
                )}
                <div className="product-details-container flex-column px-3 mt-2">
                  {hoverId !== index && !item.count && (
                    <strong>{item.vendor}</strong>
                  )}

                  <div style={nameStyle} className="text-truncate">
                    {hoverId !== index && !item.count && item.name}
                    {hoverId === index &&
                      !item.count &&
                      "Sizes: XS, S, M, L, XL"}
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
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default ProductList;
