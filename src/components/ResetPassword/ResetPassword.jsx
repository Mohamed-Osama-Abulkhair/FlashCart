import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../utils/baseURL.js";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  function sendDataToApi(values) {
    setLoading(false);

    axios
      .put(baseURL + "auth/resetPassword", values)
      .then(({ data }) => {
        localStorage.setItem("token", data.token);
        toast.success(`successfully reset password`);
        navigate("/home");
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
      email: Yup.string().email().min(5).max(100).trim().required(),
      newPassword: Yup.string()
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

  const resetPass = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      sendDataToApi(values);
    },
  });

  return (
    <>
      <div className="w-75 m-auto mt-5">
        <h2>Reset Your Password :</h2>
        <form className="mt-4" onSubmit={resetPass.handleSubmit}>
          <label htmlFor="email">Email:</label>
          <div className="position-relative">
            <input
              onChange={resetPass.handleChange}
              onBlur={resetPass.handleBlur}
              type="email"
              className={`form-control mb-3 mt-1 ${
                resetPass.errors.email && resetPass.touched.email
                  ? "is-invalid"
                  : resetPass.touched.email
                  ? "is-valid"
                  : ""
              }`}
              name="email"
              id="email"
            />
            {resetPass.errors.email && resetPass.touched.email ? (
              <div className="error-message">
                <i
                  className="fa-solid fa-caret-up"
                  style={{ color: "#df0016" }}
                />
                <p className="m-0 py-1">{resetPass.errors.email}</p>
              </div>
            ) : (
              ""
            )}
          </div>
          <label htmlFor="password">New Password:</label>
          <div className="position-relative">
            <input
              onChange={resetPass.handleChange}
              onBlur={resetPass.handleBlur}
              type="password"
              className={`form-control mb-3 mt-1 ${
                resetPass.errors.newPassword && resetPass.touched.newPassword
                  ? "is-invalid"
                  : resetPass.touched.newPassword
                  ? "is-valid"
                  : ""
              }`}
              name="newPassword"
              id="password"
            />
            {resetPass.errors.newPassword && resetPass.touched.newPassword ? (
              <div className="error-message" style={{ zIndex: "99" }}>
                <i
                  className="fa-solid fa-caret-up"
                  style={{ color: "#df0016" }}
                />
                <p className="m-0 py-1">{resetPass.errors.newPassword}</p>
              </div>
            ) : (
              ""
            )}
          </div>
          <button
            type="submit"
            disabled={!(resetPass.dirty && resetPass.isValid)}
            className="btn bg-main text-white"
          >
            {loading ? (
              "Reset New Password"
            ) : (
              <i className="fa fa-spinner fa-spin"></i>
            )}
          </button>
        </form>
      </div>
    </>
  );
}
