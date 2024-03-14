import React, { useState } from "react";
import Loading from "../Loading/Loading.jsx";
import { useQuery } from "react-query";
import { baseURL } from "../../utils/baseURL.js";
import axios from "axios";

export default function Categories() {
  const [subcategories, setSubcategories] = useState([]);
  const [subLoading, setSubLoading] = useState(false);

  function getCategories() {
    return axios.get(baseURL + "categories");
  }

  async function getSubcategoriesOfCategory(id) {
    setSubLoading(true);
    const { data } = await axios.get(
      baseURL + "categories/" + id + "/subcategories"
    );
    setSubcategories(data.data);
    setSubLoading(false);
  }

  const { data, isLoading } = useQuery("getCategories", getCategories);

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
                onClick={() => getSubcategoriesOfCategory(item._id)}
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
                      <div className="row g-5">
                        {subLoading ? (
                          <div className="col-12 text-center">
                            <i className="fa fa-spinner fa-spin"></i>
                          </div>
                        ) : (
                          subcategories?.map((sub) => {
                            return (
                              <div
                                className="col-md-6 product text-center cursor-pointer"
                                key={sub._id}
                              >
                                <span>{sub.name}</span>
                              </div>
                            );
                          })
                        )}
                      </div>
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
