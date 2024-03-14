import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import Logo from "../../assets/images/freshcart-logo.svg";
export default function AuthLayout() {
  return (
    <>
      <nav className="navbar navbar-expand-md bg-body-tertiary py-3">
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
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/signup">
                  Sign Up
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/signin">
                  Sign In
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
}
