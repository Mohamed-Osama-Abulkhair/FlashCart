import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../utils/baseURL.js";

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  function sendDataToApi(values) {
    setLoading(false);

    axios
      .post(baseURL + "users/forgetPassword", values)
      .then(({ data }) => {
        toast.success(`${data.message}`);
        navigate("/resetPassword");
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
    });
    return schema;
  }

  const getCode = useFormik({
    initialValues: {
      email: "",
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
        <form className="mt-4" onSubmit={getCode.handleSubmit}>
          <label htmlFor="email">Email :</label>
          <div className="position-relative">
            <input
              onChange={getCode.handleChange}
              onBlur={getCode.handleBlur}
              type="email"
              className={`form-control mb-3 mt-1 ${
                getCode.errors.email && getCode.touched.email
                  ? "is-invalid"
                  : getCode.touched.email
                  ? "is-valid"
                  : ""
              }`}
              name="email"
              id="email"
            />
            {getCode.errors.email && getCode.touched.email ? (
              <div className="error-message">
                <i
                  className="fa-solid fa-caret-up"
                  style={{ color: "#df0016" }}
                />
                <p className="m-0 py-1">{getCode.errors.email}</p>
              </div>
            ) : (
              ""
            )}
          </div>
          <button
            type="submit"
            disabled={!(getCode.dirty && getCode.isValid)}
            className="btn bg-main text-white"
          >
            {loading ? (
              "Get Reset Code"
            ) : (
              <i className="fa fa-spinner fa-spin"></i>
            )}
          </button>
        </form>
      </div>
    </>
  );
}
