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
  const { payCash, payCard, setCounter } = useContext(storeContext);
  const { id } = useParams();

  async function sendDataToApi(values) {
    setLoading(false);
    let data;
    if (orderMethod == "cash") {
      data = await payCash(id, values);
      console.log(data);
      if (data.message == "success") {
        toast.success(data.message);
        setCounter(0);
        navigate("/allorders");
      }
    } else {
      data = await payCard(id, values);
      console.log(data)
      if (data.message == "success") {
        window.location.href = data.session.url;
      }
    }
  }

  function validationSchema() {
    const schema = new Yup.object({
      street: Yup.string().min(3).max(20).trim().required(),
      phone: Yup.string()
        .length(11)
        .matches(/^(012|010|011|015)\d{8}$/, "egyptian numbers only")
        .trim()
        .required(),
      city: Yup.string().min(3).max(20).trim().required(),
    });
    return schema;
  }

  const addressDetails = useFormik({
    initialValues: {
      city: "",
      street: "",
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
        <h2>Your Address :</h2>
        <form className="mt-4" onSubmit={addressDetails.handleSubmit}>
          <label htmlFor="street">Street:</label>
          <div className="position-relative">
            <textarea
              onChange={addressDetails.handleChange}
              onBlur={addressDetails.handleBlur}
              name="street"
              id="street"
              rows="2"
              minLength={3}
              maxLength={20}
              className={`form-control mb-3 mt-1 ${
                addressDetails.errors.street && addressDetails.touched.street
                  ? "is-invalid"
                  : addressDetails.touched.street
                  ? "is-valid"
                  : ""
              }`}
            ></textarea>
            {addressDetails.errors.street && addressDetails.touched.street ? (
              <div className="error-message">
                <i
                  className="fa-solid fa-caret-up"
                  style={{ color: "#df0016" }}
                />
                <p className="m-0 py-1">{addressDetails.errors.street}</p>
              </div>
            ) : (
              ""
            )}
          </div>
          <label htmlFor="city">City:</label>
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
          <label htmlFor="phone">Phone:</label>
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
              !(addressDetails.dirty && addressDetails.isValid) ||
              !loading ||
              !orderMethod
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
