import React, { useContext, useEffect, useState } from "react";
import { storeContext } from "../Context/storeContext.js";
import Loading from "../Loading/Loading.jsx";
import { Link } from "react-router-dom";
import CartItem from "../CartItem/CartItem.jsx";

export default function Cart() {
  const [loading, setLoading] = useState(true);

  const { getCartOrWishlist, cartData, setCartData } = useContext(storeContext);

  useEffect(() => {
    (async () => {
      const data = await getCartOrWishlist("cart");
      data?.response?.data.statusMsg == "fail"
        ? setCartData(null)
        : setCartData(data);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      {loading ? <Loading /> : ""}
      {!cartData?.numOfCartItems ? (
        <h2 className="text-center my-5 text-main">No items in cart</h2>
      ) : (
        <div className="container-fluid py-5 px-5 ">
          <div className="row bg-main-light rounded-4 p-3 m-0 cartRow">
            <h2>Shop Cart</h2>
            <p className="text-main fw-bold">
              Total Price : {cartData?.data.totalCartPrice} EGP
            </p>
            {cartData?.data.products.map((item) => {
              return <CartItem key={item._id} item={item} />;
            })}
            <Link
              to={"/address/" + cartData.data._id}
              className="btn bg-main text-white mt-4 m-auto w-50"
            >
              Place Order
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
