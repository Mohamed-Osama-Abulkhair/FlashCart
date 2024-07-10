import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./components/Layouts/MainLayout.jsx";
import Home from "./components/Home/Home.jsx";
import Products from "./components/Products/Products.jsx";
import Categories from "./components/Categories/Categories.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Wishlist from "./components/Wishlist/Wishlist.jsx";
import AuthLayout from "./components/Layouts/AuthLayout.jsx";
import Signup from "./components/Signup/Signup.jsx";
import Signin from "./components/Signin/Signin.jsx";
import Notfound from "./components/Notfound/Notfound.jsx";
import { Offline } from "react-detect-offline";
import { ToastContainer } from "react-toastify";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes.jsx";
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx";
import StoreContextProvider from "./components/Context/storeContext.js";
import Brands from "./components/Brands/Brands.jsx";
import Address from "./components/Address/Address.jsx";
import AllOrders from "./components/AllOrders/AllOrders.jsx";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword.jsx";
import ResetPassword from "./components/ResetPassword/ResetPassword.jsx";

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          ),
        },
        {
          path: "FlashCart",
          element: (
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          ),
        },
        {
          path: "home",
          element: (
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoutes>
              <Products />
            </ProtectedRoutes>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoutes>
              <Categories />
            </ProtectedRoutes>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoutes>
              <Brands />
            </ProtectedRoutes>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoutes>
              <Wishlist />
            </ProtectedRoutes>
          ),
        },
        {
          path: "product-details/:id",
          element: (
            <ProtectedRoutes>
              <ProductDetails />
            </ProtectedRoutes>
          ),
        },
        {
          path: "address/:id",
          element: (
            <ProtectedRoutes>
              <Address />
            </ProtectedRoutes>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoutes>
              <AllOrders />
            </ProtectedRoutes>
          ),
        },
        { path: "*", element: <Notfound /> },
      ],
    },
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        { path: "signup", element: <Signup /> },
        { path: "signin", element: <Signin /> },
        { path: "forgotPassword", element: <ForgetPassword /> },
        { path: "resetPassword", element: <ResetPassword /> },
      ],
    },
  ]);

  return (
    <>
      <StoreContextProvider>
        <RouterProvider router={routes} />
      </StoreContextProvider>

      <Offline>
        <div className="offline">You are Offline Now!</div>
      </Offline>
      <ToastContainer theme="colored" autoClose={3000} />
    </>
  );
}
