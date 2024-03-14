import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { storeContext } from "../Context/storeContext.js";

export default function CartItem(item) {
  const [delBtnLoading, setDelBtnLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const { deleteItem, setCounter, updateItemQuantity, setCartData } =
    useContext(storeContext);

  async function deleteProduct(id) {
    setDelBtnLoading(true);
    const data = await deleteItem(id, "cart");
    if (data.status == "success") {
      toast.warning("Product deleted successfully");
      setCartData(data);
      setCounter(data.numOfCartItems);
      setDelBtnLoading(false);
    }
  }

  async function updateProduct(id, count) {
    setBtnLoading(true);
    const data = await updateItemQuantity(id, count);
    if (data.status == "success") {
      toast.success("Quantity updated successfully");
      setCartData(data);
      setCounter(data.numOfCartItems);
      setBtnLoading(false);
    }
  }

  return (
    <>
      <div className="row py-3 ms-0 border-bottom gy-2">
        <div className="col-md-1">
          <img src={item.item.product.imageCover} alt="" />
        </div>
        <div className="col-md-11 d-flex justify-content-between align-items-center">
          <div>
            <p className="m-0">
              {item.item.product.title.split(" ").splice(0, 2).join(" ")}
            </p>
            <p className="text-main m-0">price :{item.item.price}</p>
            <button
              className="btn btn-danger mt-2"
              onClick={() => deleteProduct(item.item.product._id)}
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
              className="btn btn-outline-danger fw-bold"
              onClick={() =>
                updateProduct(item.item.product._id, item.item.count - 1)
              }
              disabled={btnLoading || item.item.count <= 1}
            >
              {!btnLoading ? "-" : <i className="fa fa-spinner fa-spin"></i>}
            </button>
            <span className="px-2 fw-bold">{item.item.count}</span>
            <button
              className="btn btn-outline-success fw-bold"
              onClick={() =>
                updateProduct(item.item.product._id, item.item.count + 1)
              }
              disabled={btnLoading}
            >
              {!btnLoading ? "+" : <i className="fa fa-spinner fa-spin"></i>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
