import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { baseURL } from "../../utils/baseURL.js";

export default function Signin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(true);

  function showPasswordFun() {
    setShowPassword(!showPassword);
  }

  function sendDataToApi(values) {
    setLoading(false);

    axios
      .post(baseURL + "users/signin", values)
      .then(({ data }) => {
        localStorage.setItem("token", data.token);
        toast.success(`${data.message}`);
        navigate("/home");
      })
      .catch((err) => {
        setLoading(true);
        toast.error(`${err.response?.data.message}`, {
          position: "bottom-center",
        });
      });
  }

  function validationSchema() {
    const schema = new Yup.object({
      email: Yup.string().email().min(5).max(100).trim().required(),
      password: Yup.string()
        .min(8)
        .max(30)
        .transform((value, originalValue) => originalValue.replace(/\s/g, ""))
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.*[a-zA-Z])\S{8,30}$/,
          "password should be {8:30} characters & contain at least 1 {lowercase, uppercase & special} character"
        )
        .trim()
        .required(),
    });
    return schema;
  }

  const login = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      sendDataToApi(values);
    },
  });

  return (
    <>
      <div className="w-75 m-auto mt-5">
        <h2>login Now:</h2>
        <form className="signUpForm mt-4" onSubmit={login.handleSubmit}>
          <label htmlFor="email">Email:</label>
          <div className="position-relative">
            <input
              onChange={login.handleChange}
              onBlur={login.handleBlur}
              type="email"
              className={`form-control mb-3 mt-1 ${
                login.errors.email && login.touched.email
                  ? "is-invalid"
                  : login.touched.email
                  ? "is-valid"
                  : ""
              }`}
              name="email"
              id="email"
            />
            {login.errors.email && login.touched.email ? (
              <div className="error-message">
                <i
                  className="fa-solid fa-caret-up"
                  style={{ color: "#df0016" }}
                />
                <p className="m-0 py-1">{login.errors.email}</p>
              </div>
            ) : (
              ""
            )}
          </div>
          <label htmlFor="password">Password:</label>
          <div className="position-relative mb-4">
            <input
              type={showPassword ? "password" : "text"}
              onChange={login.handleChange}
              onBlur={login.handleBlur}
              className={`form-control password ${
                login.errors.password && login.touched.password
                  ? "is-invalid"
                  : login.touched.password
                  ? "is-valid"
                  : ""
              }`}
              name="password"
            />
            <i
              className={`fa-solid position-absolute ${
                showPassword ? "fa-eye" : "fa-eye-slash"
              } ${
                login.errors.password && login.touched.password
                  ? "iconError"
                  : login.touched.password
                  ? "iconSucc"
                  : ""
              }   `}
              onClick={() => {
                showPasswordFun();
              }}
            ></i>
            {login.errors.password && login.touched.password ? (
              <div className="error-message">
                <i
                  className="fa-solid fa-caret-up"
                  style={{ color: "#df0016" }}
                />
                <p className="m-0 py-1">{login.errors.password}</p>
              </div>
            ) : (
              ""
            )}
          </div>
          <Link to={"/forgotPassword"}>
            <p className="ms-auto text-info fw-bold forgetText">
              Forget password ?
            </p>
          </Link>
          <button
            type="submit"
            disabled={!(login.dirty && login.isValid)}
            className="btn bg-main text-white"
          >
            {loading ? "Log In" : <i className="fa fa-spinner fa-spin"></i>}
          </button>
        </form>
      </div>
    </>
  );
}
