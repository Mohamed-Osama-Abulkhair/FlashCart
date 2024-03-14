import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading.jsx";
import { storeContext } from "../Context/storeContext.js";
import { baseURL } from "../../utils/baseURL.js";
import { toast } from "react-toastify";

export default function ProductDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const [product, setProduct] = useState({});

  const [btnLoading, setBtnLoading] = useState(false);

  const {
    counter,
    setCounter,
    addItem,
    deleteItem,
    setWishlistCounter,
    heartColors,
    setHeartColors,
  } = useContext(storeContext);

  async function getProduct() {
    const { data } = await axios.get(baseURL + `products/${id}`);
    setProduct(data.data);
    setLoading(false);
  }

  useEffect(() => {
    getProduct();
  }, []);

  async function addProductToCart(productId) {
    setBtnLoading(true);
    const data = await addItem(productId, "cart");

    if (data.status == "success") {
      toast.success(
        <span>
          product added successfully{" "}
          <i className="fa-solid fa-cart-plus ms-2"></i>
        </span>
      );
      setCounter(data.numOfCartItems);
      setBtnLoading(false);
    }
  }

  async function addProductToWishlist(productId) {
    setBtnLoading(true);
    const data = await addItem(productId, "wishlist");

    if (data.status == "success") {
      toast.success(
        <span>
          product added successfully{" "}
          <i className="fa-solid fa-heart-circle-plus ms-2"></i>
        </span>
      );
      setWishlistCounter(data.data.length);
      setHeartColors((prevState) => ({
        ...prevState,
        [productId]: "red",
      }));
      setBtnLoading(false);
    }
  }

  async function deleteProduct(productId) {
    setBtnLoading(true);
    const data = await deleteItem(productId, "wishlist");
    if (data.status == "success") {
      toast.warning(
        <span>
          Product deleted successfully
          <i className="fa-solid fa-heart-crack ms-2"></i>
        </span>
      );
      setWishlistCounter(data.data.length);
      setHeartColors((prevState) => ({
        ...prevState,
        [productId]: "",
      }));
      setBtnLoading(false);
    }
  }

  return (
    <>
      {loading ? <Loading /> : ""}
      <div className="container-fluid my-5 px-5">
        <div className="row">
          <div className="col-md-3 border-3 border-black border-solid border-info">
            <img src={product.imageCover} alt="" />
          </div>
          <div className="col-md-9">
            <h4>{product.title}</h4>
            <p className="my-3">{product.description}</p>
            <span>{product.category?.name}</span>
            <div className="d-flex justify-content-between align-items-center my-4">
              <p>{product.price} EGP</p>
              <button
                className="wishBtn"
                onClick={() =>
                  heartColors[product._id] !== "red"
                    ? addProductToWishlist(product._id)
                    : deleteProduct(product._id)
                }
                disabled={btnLoading}
              >
                <i
                  className={`fa-solid fa-heart ${
                    heartColors[product._id] === "red" ? "text-danger" : ""
                  }`}
                ></i>
              </button>
              <div>
                <i className="fa-solid fa-star rating-color"></i>
                {product.ratingsAverage}
              </div>
            </div>
            <button
              className="btn bg-main w-100 text-white"
              onClick={() => addProductToCart(product._id)}
              disabled={btnLoading}
            >
              {!btnLoading ? "Add to Cart" : "Loading..."}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
