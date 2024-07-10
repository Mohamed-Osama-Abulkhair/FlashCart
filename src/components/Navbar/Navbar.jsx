import React, { useContext, useEffect, useState } from "react";
import Logo from "../../assets/images/freshcart-logo.svg";
import { Link, NavLink } from "react-router-dom";
import { storeContext } from "../Context/storeContext.js";

// Throttle function to limit the frequency of scroll event handling
const throttle = (callback, delay) => {
  let lastTime = 0;
  return function () {
    const now = new Date().getTime();
    if (now - lastTime >= delay) {
      callback();
      lastTime = now;
    }
  };
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  const {
    counter,
    setCounter,
    getCartOrWishlist,
    wishlistCounter,
    setWishlistCounter,
    setHeartColors,
  } = useContext(storeContext);

  useEffect(() => {
    const handleScroll = throttle(() => {
      setIsScrolled(window.scrollY > 100);
    }, 50);

    window.addEventListener("scroll", handleScroll);

    (async () => {
      const [data, list] = await Promise.all([
        getCartOrWishlist("carts"),
        getCartOrWishlist("wishlist"),
      ]);
      setCounter(data?.cart?.cartItems?.length);

      setWishlistCounter(list?.result?.length);
      const ids = list?.result?.map((item) => {
        return item._id;
      });
      const colors = ids?.reduce((acc, id) => {
        acc[id] = "red";
        return acc;
      }, {});
      setHeartColors(colors);
    })();
  }, []);

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg ${isScrolled ? "scrolled" : ""}`}
      >
        <div className="container-fluid px-5">
          <Link className="navbar-brand" to="/">
            <img src={Logo} alt="" />
          </Link>
          <span
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fa-solid fa-bars"></i>
          </span>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/home">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/products">
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/categories">
                  Categories
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/brands">
                  Brands
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link position-relative" to="/allorders">
                  All Orders
                  <i className="fa-solid fa-truck cartIcon ms-1"></i>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link position-relative" to="/cart">
                  Cart
                  <i className="fa-solid fa-cart-shopping cartIcon ms-1"></i>
                  {counter ? (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {counter}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  ) : (
                    ""
                  )}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link position-relative" to="/wishlist">
                  Wishlist
                  <i className="fa-solid fa-heart cartIcon ms-1"></i>
                  {wishlistCounter ? (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {wishlistCounter}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  ) : (
                    ""
                  )}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/signin"
                  onClick={() => localStorage.clear()}
                >
                  SignOut
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
