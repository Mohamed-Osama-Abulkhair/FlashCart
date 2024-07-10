import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { storeContext } from "../Context/storeContext.js";
import { toast } from "react-toastify";
import "./Product.css";

export default function Product(item) {
  const {
    setCounter,
    addItem,
    setWishlistCounter,
    heartColors,
    setHeartColors,
    deleteItem,
  } = useContext(storeContext);

  const [btnLoading, setBtnLoading] = useState(false);
  const [heartBtnLoading, setHeartBtnLoading] = useState(false);

  async function addProductToCart(productId) {
    setBtnLoading(true);
    const data = await addItem(productId, "carts");

    if (data.message == "success") {
      toast.success(
        <span>
          product added successfully{" "}
          <i className="fa-solid fa-cart-plus ms-2"></i>
        </span>
      );
      setCounter(data.cart.cartItems.length);
      setBtnLoading(false);
    }
  }

  async function deleteProduct(productId) {
    setHeartBtnLoading(true);
    const data = await deleteItem(productId, "wishlist");
    if (data.message == "success") {
      toast.warning(
        <span>
          Product deleted successfully
          <i className="fa-solid fa-heart-crack ms-2"></i>
        </span>
      );
      setWishlistCounter(data.result.length);
      setHeartColors((prevState) => ({
        ...prevState,
        [productId]: "",
      }));
      setHeartBtnLoading(false);
    }
  }

  async function addProductToWishlist(productId) {
    setHeartBtnLoading(true);
    const data = await addItem(productId, "wishlist");

    if (data.message == "success") {
      toast.success(
        <span>
          product added successfully{" "}
          <i className="fa-solid fa-heart-circle-plus ms-2"></i>
        </span>
      );
      setWishlistCounter(data.result.length);
      setHeartColors((prevState) => ({
        ...prevState,
        [productId]: "red",
      }));
      setHeartBtnLoading(false);
    }
  }

  return (
    <>
      <div className="col-md-6 col-lg-4 col-xl-3">
        <div className="product cursor-pointer text-center rounded-4 p-3 position-relative">
          <Link to={"/product-details/" + item.item._id}>
            <img src={item.item.imageCover.url} alt={item.item.title} />
            <span className="text-main">{item.item.category.name}</span>
            <h5 className="my-2 fw-bold">
              {item.item.title.split(" ").splice(0, 2).join(" ")}
            </h5>
            <div className="d-flex justify-content-between align-items-center mb-3">
              {item.item.finalPrice < item.item.price ? (
                <div>
                  <p className="m-0">{item.item.finalPrice} EGP</p>
                  <p className="price m-0">{item.item.price}</p>
                </div>
              ) : (
                <span>{item.item.price} EGP</span>
              )}
              <div>
                <i className="fa-solid fa-star rating-color me-1"></i>
                <span>{item.item.ratingAvg}</span>
              </div>
            </div>
          </Link>
          <button
            className="wishBtn position-absolute"
            onClick={() =>
              heartColors[item.item._id] !== "red"
                ? addProductToWishlist(item.item._id)
                : deleteProduct(item.item._id)
            }
            disabled={heartBtnLoading}
          >
            <i
              className={`fa-solid fa-heart ${
                heartColors?.length
                  ? heartColors[item.item._id] === "red"
                    ? "text-danger"
                    : ""
                  : ""
              }`}
            ></i>
          </button>
          <button
            className="btn bg-main w-100 text-white"
            onClick={() => addProductToCart(item.item._id)}
            disabled={btnLoading}
          >
            {!btnLoading ? "Add to Cart" : "Loading..."}
          </button>
        </div>
      </div>
    </>
  );
}
