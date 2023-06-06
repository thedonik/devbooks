import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import BannerImg from "../assets/images/swiper.png";

import "swiper/scss";

export default function Banner() {
  return (
    <div className="container">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide className="w-100">
          {" "}
          <img className="img-fluid" src={BannerImg} alt="swiper img" />
        </SwiperSlide>
        <SwiperSlide className="w-100">
          {" "}
          <img className="img-fluid" src={BannerImg} alt="swiper img" />
        </SwiperSlide>
        <SwiperSlide className="w-100">
          {" "}
          <img className="img-fluid" src={BannerImg} alt="swiper img" />
        </SwiperSlide>
        <SwiperSlide className="w-100">
          {" "}
          <img className="img-fluid" src={BannerImg} alt="swiper img" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
