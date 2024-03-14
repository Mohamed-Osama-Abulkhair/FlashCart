import React from "react";
import errorImg from "../../assets/images/error.svg";

export default function Notfound() {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <img src={errorImg} className="w-50 mt-5" alt="Not found" />
    </div>
  );
}
