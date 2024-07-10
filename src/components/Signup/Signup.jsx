import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../utils/baseURL.js";
import "./Signup.css";

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(true);

  function showPasswordFun() {
    setShowPassword(!showPassword);
  }

  function sendDataToApi(values) {
    setLoading(false);

    axios
      .post(baseURL + "users", values)
      .then(({ data }) => {
        toast.success(`${data.message}`);
        navigate("/signin");
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
      name: Yup.string()
        .min(3)
        .max(30)
        .transform((value, originalValue) => originalValue.replace(/\s/g, ""))
        .trim()
        .required(),
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
      phone: Yup.string()
        .required("Phone number is required")
        .length(11, "Phone number must be exactly 11 digits")
        .matches(
          /^(012|010|011|015)\d{8}$/,
          "Phone number must be a valid Egyptian number"
        ),
    });
    return schema;
  }

  const register = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
    validationSchema,
    onSubmit: (values) => {
      sendDataToApi(values);
    },
  });

  return (
    <>
      <div className="w-75 m-auto mt-5">
        <h2>Register Now:</h2>
        <form className="signUpForm mt-4 " onSubmit={register.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <div className="position-relative">
            <input
              onChange={register.handleChange}
              onBlur={register.handleBlur}
              type="name"
              className={`form-control mb-3 mt-1 ${
                register.errors.name && register.touched.name
                  ? "is-invalid"
                  : register.touched.name
                  ? "is-valid"
                  : ""
              }`}
              name="name"
              id="name"
            />
            {register.errors.name && register.touched.name ? (
              <div className="error-message">
                <i
                  className="fa-solid fa-caret-up"
                  style={{ color: "#df0016" }}
                />
                <p className="m-0 py-1">{register.errors.name}</p>
              </div>
            ) : (
              ""
            )}
          </div>

          <label htmlFor="email">Email:</label>
          <div className="position-relative">
            <input
              onChange={register.handleChange}
              onBlur={register.handleBlur}
              type="email"
              className={`form-control mb-3 mt-1 ${
                register.errors.email && register.touched.email
                  ? "is-invalid"
                  : register.touched.email
                  ? "is-valid"
                  : ""
              }`}
              name="email"
              id="email"
            />
            {register.errors.email && register.touched.email ? (
              <div className="error-message">
                <i
                  className="fa-solid fa-caret-up"
                  style={{ color: "#df0016" }}
                />
                <p className="m-0 py-1">{register.errors.email}</p>
              </div>
            ) : (
              ""
            )}
          </div>
          <label htmlFor="password">Password:</label>
          <div className="position-relative mb-4">
            <input
              type={showPassword ? "password" : "text"}
              onChange={register.handleChange}
              onBlur={register.handleBlur}
              className={`form-control password ${
                register.errors.password && register.touched.password
                  ? "is-invalid"
                  : register.touched.password
                  ? "is-valid"
                  : ""
              }`}
              name="password"
            />
            <i
              className={`fa-solid position-absolute ${
                showPassword ? "fa-eye" : "fa-eye-slash"
              } ${
                register.errors.password && register.touched.password
                  ? "iconError"
                  : register.touched.password
                  ? "iconSucc"
                  : ""
              }   `}
              onClick={() => {
                showPasswordFun();
              }}
            ></i>
            {register.errors.password && register.touched.password ? (
              <div className="error-message">
                <i
                  className="fa-solid fa-caret-up"
                  style={{ color: "#df0016" }}
                />
                <p className="m-0 py-1">{register.errors.password}</p>
              </div>
            ) : (
              ""
            )}
          </div>
          <label htmlFor="phone">Phone:</label>
          <div className="position-relative">
            <input
              onChange={register.handleChange}
              onBlur={register.handleBlur}
              type="text"
              className={`form-control mb-4 mt-1 ${
                register.errors.phone && register.touched.phone
                  ? "is-invalid"
                  : register.touched.phone
                  ? "is-valid"
                  : ""
              }`}
              name="phone"
              id="phone"
            />
            {register.errors.phone && register.touched.phone ? (
              <div className="error-message">
                <i
                  className="fa-solid fa-caret-up"
                  style={{ color: "#df0016" }}
                />
                <p className="m-0 py-1">{register.errors.phone}</p>
              </div>
            ) : (
              ""
            )}
          </div>

          <button
            type="submit"
            disabled={!(register.dirty && register.isValid)}
            className="btn bg-main text-white"
          >
            {loading ? "Sign Up" : <i className="fa fa-spinner fa-spin"></i>}
          </button>
        </form>
      </div>
    </>
  );
}
