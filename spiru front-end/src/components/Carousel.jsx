import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper styles
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Images
import slide1 from "../assets/images/slide1.jpg";
import slide2 from "../assets/images/slide2.jpg";
import slide3 from "../assets/images/slide3.jpg";
import slide4 from "../assets/images/slide4.jpg";

const Carousel = () => {
  return (
    <div className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] section3">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-full"
      >
        <SwiperSlide>
          <img src={slide1} alt="Slide 1" className="w-full h-full object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide2} alt="Slide 2" className="w-full h-full object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide3} alt="Slide 3" className="w-full h-full object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide4} alt="Slide 4" className="w-full h-full object-cover" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousel;
