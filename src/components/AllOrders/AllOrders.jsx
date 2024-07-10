import React, { useContext, useEffect, useState } from "react";
import { storeContext } from "../Context/storeContext.js";
import Loading from "../Loading/Loading.jsx";
import "./AllOrders.css";

export default function AllOrders() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const { getUserOrders } = useContext(storeContext);

  useEffect(() => {
    (async () => {
      const data = await getUserOrders();
      console.log(data);
      setData(data.order);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      {loading ? <Loading /> : ""}
      <div className="container-fluid my-5 px-5">
        {data.length ? (
          data.map((order) => {
            return (
              <div className="mb-4 pb-4 order row" key={order._id}>
                <div className="col-md-6">
                  <h5>Order no. : {order.id}</h5>
                </div>
                <div className="col-md-6 mb-3">
                  <h5>
                    Created At : {new Date(order.createdAt).toLocaleString()}
                  </h5>
                </div>
                <div className="col-md-6">
                  {order.orderItems.map((item) => {
                    return (
                      <div className="row align-items-center" key={item._id}>
                        <div className="col-5 mb-3">
                          <img
                            src={item.product.imageCover?.url}
                            alt={item.product.title}
                          />
                        </div>
                        <div className="col-7 px-3">
                          <h6>{item.product.title}</h6>
                          <p>QTY : {item.quantity}</p>
                          <p>Price : {item.price}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="col-md-3">
                  <div className="d-flex align-items-center">
                    <h6 className="m-0 me-2">Delivered status : </h6>
                    {order.isDelivered ? (
                      <i className="fa-solid fa-toggle-on text-success"></i>
                    ) : (
                      <i className="fa-solid fa-toggle-off text-danger"></i>
                    )}
                  </div>
                  <p className="my-3">city : {order.shippingAddress?.city}</p>
                  <p className="my-3">
                    street : {order.shippingAddress?.street}
                  </p>
                  <p className="my-3">phone : {order.shippingAddress?.phone}</p>
                </div>
                <div className="col-md-3">
                  <div className="d-flex align-items-center">
                    <h6 className="m-0 me-2">Paid status : </h6>
                    {order.isPaid ? (
                      <i className="fa-solid fa-toggle-on text-success"></i>
                    ) : (
                      <i className="fa-solid fa-toggle-off text-danger"></i>
                    )}
                  </div>
                  <p className="my-3">Method : {order.paymentMethod}</p>
                  <p className="my-3 text-main fw-bold">
                    Total Order Price : {order.totalOrderPrice}
                  </p>
                  <p className="my-3 text-main fw-bold">
                    Discount : {order.orderDiscount}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h2 className="text-center my-5 text-main">No Orders to show</h2>
        )}
      </div>
    </>
  );
}
