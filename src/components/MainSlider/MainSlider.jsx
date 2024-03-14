import React from "react";
import Slider from "react-slick";

import sliderImg1 from "../../assets/images/slider-image-1.png";
import sliderImg2 from "../../assets/images/slider-image-2.png";
import sliderImg3 from "../../assets/images/slider-image-3.png";

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed:2000,
  };

  return (
    <>
      <Slider {...settings}>
        <img src={sliderImg1} alt="slider image" />
        <img src={sliderImg2} alt="slider image" />
        <img src={sliderImg3} alt="slider image" />
      </Slider>
    </>
  );
}
