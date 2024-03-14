import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../utils/baseURL.js";

export default function VerifyCode() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  function sendDataToApi(values) {
    setLoading(false);

    axios
      .post(baseURL + "auth/verifyResetCode", values)
      .then(({ data }) => {
        toast.success(`${data.status}`);
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
      resetCode: Yup.string().length(6).trim().required(),
    });
    return schema;
  }

  const verifyCode = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: (values) => {
      sendDataToApi(values);
    },
  });

  return (
    <>
      <div className="w-75 m-auto mt-5">
        <h2>Verify Your Code :</h2>
        <form className="mt-4" onSubmit={verifyCode.handleSubmit}>
          <label htmlFor="resetCode">Code :</label>
          <div className="position-relative">
            <input
              onChange={verifyCode.handleChange}
              onBlur={verifyCode.handleBlur}
              type="text"
              className={`form-control mb-3 mt-1 ${
                verifyCode.errors.resetCode && verifyCode.touched.resetCode
                  ? "is-invalid"
                  : verifyCode.touched.resetCode
                  ? "is-valid"
                  : ""
              }`}
              name="resetCode"
              id="resetCode"
            />
            {verifyCode.errors.resetCode && verifyCode.touched.resetCode ? (
              <div className="error-message">
                <i
                  className="fa-solid fa-caret-up"
                  style={{ color: "#df0016" }}
                />
                <p className="m-0 py-1">{verifyCode.errors.resetCode}</p>
              </div>
            ) : (
              ""
            )}
          </div>
          <button
            type="submit"
            disabled={!(verifyCode.dirty && verifyCode.isValid)}
            className="btn bg-main text-white"
          >
            {loading ? (
              "Verify Your Code"
            ) : (
              <i className="fa fa-spinner fa-spin"></i>
            )}
          </button>
        </form>
      </div>
    </>
  );
}
