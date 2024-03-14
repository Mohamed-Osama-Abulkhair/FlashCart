import React, { useState } from "react";
import Loading from "../Loading/Loading.jsx";
import { useQuery } from "react-query";
import { baseURL } from "../../utils/baseURL.js";
import axios from "axios";

export default function Brands() {
  const [oneBrand, setOneBrand] = useState({});
  const [brandLoading, setBrandLoading] = useState(false);

  function getBrands() {
    return axios.get(baseURL + "brands");
  }

  async function getOneBrand(id) {
    setBrandLoading(true);
    const { data } = await axios.get(baseURL + "brands/" + id);
    setOneBrand(data.data);
    setBrandLoading(false);
  }

  const { data, isLoading } = useQuery("getBrands", getBrands);

  return (
    <>
      {isLoading ? <Loading /> : ""}
      <div className="my-5 container-fluid px-5">
        <div className="row g-5">
          {data?.data.data.map((item) => (
            <div className="col-md-4" key={item._id}>
              <div
                className="card product cursor-pointer"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => getOneBrand(item._id)}
              >
                <img
                  src={item.image}
                  className="w-100"
                  height={200}
                  alt={item.name}
                />
                <h3 className="text-center my-4">{item.name}</h3>
              </div>
              <div
                className="modal fade"
                id="exampleModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-body overflow-hidden">
                      {brandLoading ? (
                        <div className="col-12 text-center">
                          <i className="fa fa-spinner fa-spin"></i>
                        </div>
                      ) : (
                        <div className="row g-5 align-items-center">
                          <div className="col-md-6 product text-center cursor-pointer">
                            <h3 className="text-main fw-bold">
                              {oneBrand.name}
                            </h3>
                          </div>
                          <div className="col-md-6 product text-center cursor-pointer">
                            <img src={oneBrand.image} alt={oneBrand.name} />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
