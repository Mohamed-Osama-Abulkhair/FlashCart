import React from "react";
import loaderImg from "../../assets/images/loading_cart.gif";
export default function Loading() {
  return (
    <div className=" w-100 h-100 text-center position-fixed bg-white">
      <img src={loaderImg} alt="loading" className="w-50 mt-5 loading" />
    </div>
  );
}
