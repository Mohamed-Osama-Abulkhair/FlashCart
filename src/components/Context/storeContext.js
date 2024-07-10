import axios from "axios";
import { createContext, useState } from "react";
import { baseURL } from "../../utils/baseURL.js";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

export const storeContext = createContext(0);

// ______________________________ cart & wishlist ______________________________
function addItem(product, api) {
  return axios
    .post(
      baseURL + api,
      { product },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    )
    .then(({ data }) => data)
    .catch((err) => err);
}

function getCartOrWishlist(api) {
  return axios
    .get(baseURL + api, {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then(({ data }) => data)
    .catch((err) => err);
}

function deleteItem(productId, api) {
  return axios
    .delete(baseURL + api + "/" + productId, {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then(({ data }) => data)
    .catch((err) => err);
}

function updateItemQuantity(productId, quantity) {
  return axios
    .put(
      baseURL + "carts/" + productId,
      { quantity },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    )
    .then(({ data }) => data)
    .catch((err) => err);
}

// ______________________________ Paid ______________________________
function payCash(cartId, shippingAddress) {
  return axios
    .post(
      baseURL + "orders/" + cartId,
      { shippingAddress },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    )
    .then(({ data }) => data)
    .catch((err) => err);
}

function payCard(cartId, shippingAddress) {
  return axios
    .post(
      baseURL + "orders/checkout/" + cartId,
      { shippingAddress },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    )
    .then(({ data }) => data)
    .catch((err) => err);
}

function getUserOrders() {
  return axios
    .get(baseURL + "orders", {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then(({ data }) => data)
    .catch((err) => err);
}

export default function StoreContextProvider({ children }) {
  const [counter, setCounter] = useState(0);
  const [wishlistCounter, setWishlistCounter] = useState(0);
  const [heartColors, setHeartColors] = useState({});
  const [data, setData] = useState(null);
  const [cartData, setCartData] = useState(null);

  return (
    <storeContext.Provider
      value={{
        counter,
        setCounter,
        wishlistCounter,
        setWishlistCounter,
        heartColors,
        setHeartColors,
        data,
        setData,
        cartData,
        setCartData,
        addItem,
        getCartOrWishlist,
        deleteItem,
        updateItemQuantity,
        payCash,
        payCard,
        getUserOrders,
      }}
    >
      {children}
    </storeContext.Provider>
  );
}
