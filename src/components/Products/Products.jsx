import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../Loading/Loading.jsx";
import { useQuery } from "react-query";
import { baseURL } from "../../utils/baseURL.js";
import Product from "../Product/Product.jsx";

export default function Products() {
  const [priceFilter, setPriceFilter] = useState("");
  const [inputValue, setInputValue] = useState("");

  // Fetch all products when the component initially renders
  useEffect(() => {
    if (!priceFilter && !inputValue) {
      refetch();
    }
  }, []);

  function getProducts() {
    // Construct the URL based on the current filter parameters
    let url = `${baseURL}products`;
    if (priceFilter && inputValue) {
      url += `?price[${priceFilter}]=${inputValue}`;
    }
    return axios.get(url);
  }

  const { data, isLoading, refetch } = useQuery(
    ["getProducts", priceFilter, inputValue],
    getProducts
  );

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleRadioChange = (event) => {
    setPriceFilter(event.target.id);
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="container-fluid my-5 px-5">
        <div className="row g-4">
          <div className="col-md-6">
            <input
              type="number"
              className="form-control searchInput"
              placeholder="filter with price"
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6 searchRadios d-flex align-items-center justify-content-center">
            <label htmlFor="gte">Greater than or Equal to </label>
            <input
              type="radio"
              name="price"
              id="gte"
              className="ms-1 me-5"
              onChange={handleRadioChange}
              checked={priceFilter === "gte"}
            />
            <label htmlFor="lte">Less than or Equal to </label>
            <input
              type="radio"
              name="price"
              id="lte"
              className="ms-1"
              onChange={handleRadioChange}
              checked={priceFilter === "lte"}
            />
          </div>
          {data?.data.result.map((item) => {
            return <Product key={item._id} item={item} />;
          })}
        </div>
      </div>
    </>
  );
}
