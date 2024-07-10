import React, { useContext, useEffect, useState } from "react";
import { storeContext } from "../Context/storeContext.js";
import { toast } from "react-toastify";

export default function WishlistItem(item) {
  const [btnLoading, setBtnLoading] = useState(false);
  const [delBtnLoading, setDelBtnLoading] = useState(false);

  const {
    getCartOrWishlist,
    addItem,
    setCounter,
    deleteItem,
    setWishlistCounter,
    setData,
  } = useContext(storeContext);

  async function addProductToCart(id) {
    setBtnLoading(true);
    const delItem = await deleteItem(id, "wishlist");
    if (delItem.message == "success") {
      const data = await getCartOrWishlist("wishlist");
      setWishlistCounter(data.result.length);
      setData(data.result);
    }
    // _________________
    const data = await addItem(id, "carts");
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

  async function deleteProduct(id) {
    setDelBtnLoading(true);
    const data = await deleteItem(id, "wishlist");
    if (data.message == "success") {
      const data = await getCartOrWishlist("wishlist");
      toast.warning(
        <span>
          Product deleted successfully
          <i className="fa-solid fa-heart-crack ms-2"></i>
        </span>
      );
      setWishlistCounter(data.result.length);
      setData(data.result);
      setDelBtnLoading(false);
    }
  }

  return (
    <>
      <div className="row py-3 ms-0 border-bottom gy-2 wishlist">
        <div className="col-md-2">
          <img src={item.item.imageCover.url} alt={item.item.title} />
        </div>
        <div className="col-md-10 d-flex justify-content-between align-items-center">
          <div>
            <p className="m-0">
              {item.item.title.split(" ").splice(0, 2).join(" ")}
            </p>
            {item.item.finalPrice < item.item.price ? (
              <div>
                <p className="text-main m-0">{item.item.finalPrice} EGP</p>
                <p className="price m-0">{item.item.price}</p>
              </div>
            ) : (
              <p className="text-main m-0">price : {item.item.price} EGP</p>
            )}
            <button
              className="btn btn-danger mt-2"
              onClick={() => deleteProduct(item.item._id)}
              disabled={delBtnLoading}
            >
              {!delBtnLoading ? (
                <i className="fa-solid fa-trash-can"></i>
              ) : (
                <i className="fa fa-spinner fa-spin"></i>
              )}
            </button>
          </div>
          <div>
            <button
              className="btn btn-outline-success fw-bold"
              onClick={() => addProductToCart(item.item._id)}
              disabled={btnLoading}
            >
              {!btnLoading ? (
                "Add to Cart"
              ) : (
                <i className="fa fa-spinner fa-spin"></i>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
