import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Loading from "../Loading/Loading.jsx";
import { useQuery } from "react-query";
import { baseURL } from "../../utils/baseURL.js";

export default function CategoriesSlider() {
  function getCategories() {
    return axios.get(baseURL+"categories");
  }

  const { data, isLoading } = useQuery("getCategoriesSlider",getCategories);
  console.log(data)

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <>
      {isLoading ? <Loading /> : ""}
      <div className="my-5 container-fluid px-5">
        <h3 className="mb-4">Shop Popular Categories</h3>

        <Slider {...settings}>
          {data?.data.result.map((item) => (
            <div className="px-1" key={item._id}>
              <img
                src={item.mainSliderImages[0]?.url}
                className="w-100"
                height={200}
                alt={item.name}
              />
              <h6 className="text-center mt-2">{item.name}</h6>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
