import React, { useCallback, useState } from "react";

import "./SortFilter.css";

function SortFilter(props) {
  console.log("hello");

  function highlightBorder(id) {
    let items = [...document.getElementsByClassName("filter")];
    console.log(items);
    items.forEach((element) => {
      if (id === element.id) {
        element.style.border = "1px solid";
      } else {
        element.style.border = "1px solid #c4c4c4";
      }
    });
  }

  function sort(e) {}

  return (
    <>
      <div className="filter-container">
        <div className="d-flex align-items-center ">FILTERS:</div>
        <div
          className="filter px-3 pt-1 pb-1 mx-2"
          onClick={() => {
            props.filter("All");
            highlightBorder("All");
          }}
          id="All-Products"
        >
          All Products
        </div>
        <div
          className="filter px-3 pt-1 pb-1 mx-2"
          onClick={() => {
            props.filter("All");
            highlightBorder("All");
          }}
          id="All"
        >
          All
        </div>
        <div
          className="filter px-3 pt-1 pb-1 mx-2"
          onClick={() => {
            props.filter("T-shirt");
            highlightBorder("T-shirt");
          }}
          id="T-shirt"
        >
          T-shirt
        </div>
        <div
          className="filter px-3 pt-1 pb-1 mx-2"
          onClick={() => {
            props.filter("Denim");
            highlightBorder("Denim");
          }}
          id="Denim"
        >
          Denim
        </div>
        <div
          className="filter px-3 pt-1 pb-1 mx-2"
          onClick={() => {
            props.filter("shirt");
            highlightBorder("shirt");
          }}
          id="shirt"
        >
          shirt
        </div>
        <div
          className="filter px-3 pt-1 pb-1 mx-2"
          onClick={() => {
            props.filter("jacket");
            highlightBorder("jacket");
          }}
          id="jacket"
        >
          jacket
        </div>
      </div>
      <div className="sort-container px-2">
        <select
          className="dropdown"
          onChange={(e) => {
            props.sort(e);
          }}
        >
          <option selected disabled>
            Sort By
          </option>
          <option value="asc">Price Low To High</option>
          <option value="dsc">Price High To Low</option>
        </select>
      </div>
    </>
  );
}

export default React.memo(SortFilter);
