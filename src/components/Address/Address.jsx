import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { storeContext } from "../Context/storeContext.js";

export default function Address() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [orderMethod, setOrderMethod] = useState("");
  const { payCash, payCard ,setCounter} = useContext(storeContext);
  const { id } = useParams();

  async function sendDataToApi(values) {
    setLoading(false);
    let data;
    if (orderMethod == "cash") {
      data = await payCash(id, values);
      if (data.status == "success") {
        toast.success(data.status);
        setCounter(0)
        navigate("/products");
      }
    } else {
      data = await payCard(id, values);
      if (data.status == "success") {
        window.location.href = data.session.url;
      }
    }
  }

  function validationSchema() {
    const schema = new Yup.object({
      details: Yup.string().min(20).max(300).trim().required(),
      phone: Yup.string()
        .length(11)
        .matches(/^(012|010|011|015)\d{8}$/, "egyptian numbers only")
        .trim()
        .required(),
      city: Yup.string().min(4).max(30).trim().required(),
    });
    return schema;
  }

  const addressDetails = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: (values) => {
      sendDataToApi(values);
    },
  });

  return (
    <>
      <div className="w-75 m-auto mt-5">
        <h2>Your Address :</h2>
        <form className="mt-4" onSubmit={addressDetails.handleSubmit}>
          <label htmlFor="email">Details:</label>
          <div className="position-relative">
            <textarea
              onChange={addressDetails.handleChange}
              onBlur={addressDetails.handleBlur}
              name="details"
              id="details"
              rows="2"
              minLength={20}
              maxLength={300}
              className={`form-control mb-3 mt-1 ${
                addressDetails.errors.details && addressDetails.touched.details
                  ? "is-invalid"
                  : addressDetails.touched.details
                  ? "is-valid"
                  : ""
              }`}
            ></textarea>
            {addressDetails.errors.details && addressDetails.touched.details ? (
              <div className="error-message">
                <i
                  className="fa-solid fa-caret-up"
                  style={{ color: "#df0016" }}
                />
                <p className="m-0 py-1">{addressDetails.errors.details}</p>
              </div>
            ) : (
              ""
            )}
          </div>
          <label htmlFor="Phone">Phone:</label>
          <div className="position-relative">
            <input
              onChange={addressDetails.handleChange}
              onBlur={addressDetails.handleBlur}
              type="text"
              className={`form-control mb-3 mt-1 ${
                addressDetails.errors.phone && addressDetails.touched.phone
                  ? "is-invalid"
                  : addressDetails.touched.phone
                  ? "is-valid"
                  : ""
              }`}
              name="phone"
              id="phone"
            />
            {addressDetails.errors.phone && addressDetails.touched.phone ? (
              <div className="error-message" style={{ zIndex: "99" }}>
                <i
                  className="fa-solid fa-caret-up"
                  style={{ color: "#df0016" }}
                />
                <p className="m-0 py-1">{addressDetails.errors.phone}</p>
              </div>
            ) : (
              ""
            )}
          </div>
          <label htmlFor="City">City:</label>
          <div className="position-relative">
            <input
              onChange={addressDetails.handleChange}
              onBlur={addressDetails.handleBlur}
              type="text"
              className={`form-control mb-3 mt-1 ${
                addressDetails.errors.city && addressDetails.touched.city
                  ? "is-invalid"
                  : addressDetails.touched.city
                  ? "is-valid"
                  : ""
              }`}
              name="city"
              id="city"
            />
            {addressDetails.errors.city && addressDetails.touched.city ? (
              <div className="error-message" style={{ zIndex: "99" }}>
                <i
                  className="fa-solid fa-caret-up"
                  style={{ color: "#df0016" }}
                />
                <p className="m-0 py-1">{addressDetails.errors.city}</p>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="d-flex">
            <div className="me-5">
              <label htmlFor="cash" className="me-2">
                Cash Order:
              </label>
              <input
                type="radio"
                id="cash"
                name="order"
                value="cash"
                onChange={() => setOrderMethod("cash")}
              />
            </div>
            <div>
              <label htmlFor="card" className="me- 2">
                Card:
              </label>
              <input
                type="radio"
                id="card"
                name="order"
                onChange={() => setOrderMethod("card")}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={
              !(addressDetails.dirty && addressDetails.isValid) || !loading
            }
            className="btn bg-main text-white"
          >
            {loading ? "Pay" : <i className="fa fa-spinner fa-spin"></i>}
          </button>
        </form>
      </div>
    </>
  );
}
