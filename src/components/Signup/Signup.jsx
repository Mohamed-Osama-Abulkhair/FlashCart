import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../utils/baseURL.js";

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  function sendDataToApi(values) {
    setLoading(false);

    axios
      .post(baseURL + "auth/signup", values)
      .then(({ data }) => {
        toast.success(`${data.message}`);
        navigate("/signin");
      })
      .catch((err) => {
        setLoading(true);
        toast.error(`${err.response.data.message}`, {
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
      rePassword: Yup.string()
        .oneOf([Yup.ref("password")], "rePassword should match password")
        .trim()
        .required(),
    });
    return schema;
  }

  const register = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
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
        <form className="mt-4" onSubmit={register.handleSubmit}>
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
          <div className="position-relative">
            <input
              onChange={register.handleChange}
              onBlur={register.handleBlur}
              type="password"
              className={`form-control mb-3 mt-1 ${
                register.errors.password && register.touched.password
                  ? "is-invalid"
                  : register.touched.password
                  ? "is-valid"
                  : ""
              }`}
              name="password"
              id="password"
            />
            {register.errors.password && register.touched.password ? (
              <div className="error-message" style={{ zIndex: "99" }}>
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
          <label htmlFor="rePassword">RePassword:</label>
          <div className="position-relative">
            <input
              onChange={register.handleChange}
              onBlur={register.handleBlur}
              type="password"
              className={`form-control mb-4 mt-1 ${
                register.errors.rePassword && register.touched.rePassword
                  ? "is-invalid"
                  : register.touched.rePassword
                  ? "is-valid"
                  : ""
              }`}
              name="rePassword"
              id="rePassword"
            />
            {register.errors.rePassword && register.touched.rePassword ? (
              <div className="error-message">
                <i
                  className="fa-solid fa-caret-up"
                  style={{ color: "#df0016" }}
                />
                <p className="m-0 py-1">{register.errors.rePassword}</p>
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
