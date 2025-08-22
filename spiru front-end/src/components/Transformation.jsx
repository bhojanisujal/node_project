import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import image4 from "../assets/images/tabimage4.webp"; 
import { FaHeart } from "react-icons/fa";
import { HiMiniShare } from "react-icons/hi2";
import { videos } from "../constant/Constant";

const Transformation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  const [disableNext, setDisableNext] = useState(false);

  const openModal = (index) => {
    document.querySelectorAll(".swiper-slide-video").forEach((v) => v.pause());
    setActiveIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
    document.querySelectorAll(".swiper-slide-video").forEach((v) => v.pause());
  };

  useEffect(() => {
    if (swiperRef.current) {
      setDisableNext(swiperRef.current.isEnd);
    }
  }, [activeIndex]);

  const handleVideoEnd = (index) => {
    if (swiperRef.current) {
      const nextIndex = (index + 1) % videos.length;
      swiperRef.current.slideTo(nextIndex, 500, false);
      setDisableNext(false); // Enable next button after loop
    }
  };

  return (
    <>
      <div className="transformation container mx-auto w-full px-4 py-10 bg-white">
        <h2 className="text-3xl font-bold text-center mb-3">Spiru Transformation</h2>
        <div className="h-[2px] w-[140px] bg-green-700 mx-auto mb-8 rounded-full" />

        <Swiper
          spaceBetween={16}
          slidesPerView={4}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 6 },
            1440: { slidesPerView: 5 },
          }}
          modules={[Navigation, Pagination]}
        >
          {videos.map((product, index) => (
            <SwiperSlide key={product.id}>
              <div className="relative rounded-xl shadow hover:shadow-lg transition-all duration-300">
                <div className="relative w-full h-[400px] rounded-t-xl overflow-hidden group">
                  <video
                    src={product.video}
                    muted
                    loop
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover pointer-events-none"
                  />
                  <div
                    className="absolute inset-0 z-10 cursor-pointer"
                    onClick={() => openModal(index)}
                  />
                 
                </div>

                <div className="absolute bottom-[5px] left-0 w-full px-2 z-10 pointer-events-none">
                  <div className="bg-green-700 w-full rounded-xl">
                    <div className="bg-white w-full rounded-lg px-3 py-2 flex items-center gap-3">
                      <div className="w-16 h-14 bg-[#B4CEBA] flex items-center justify-center overflow-hidden rounded">
                        <img
                          src={product.productImage}
                          alt={product.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <p className="font-semibold text-[12px] text-black">
                          {product.title}
                        </p>
                        <div className="text-[12px] font-bold text-black">
                          ₹{product.price}
                          {product.originalPrice && (
                            <span className="text-gray-400 line-through font-medium ml-2 text-[12px]">
                              ₹{product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
            <div
              className="absolute top-5 right-5 z-50 text-white text-4xl cursor-pointer"
              onClick={closeModal}
            >
              &times;
            </div>

            <Swiper
              initialSlide={activeIndex}
              slidesPerView={3}
              spaceBetween={0}
              loop={false}
              centeredSlides={true}
              modules={[Pagination, Navigation]}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
                disabledClass: "swiper-button-disabled",
              }}
              className="w-[90vw] max-w-6xl h-[90vh]"
              onSlideChange={(swiper) => {
                document
                  .querySelectorAll(".swiper-slide-video")
                  .forEach((v) => v.pause());
                const currentVideo =
                  swiper.slides[swiper.activeIndex]?.querySelector("video");
                currentVideo?.play();
                setDisableNext(swiper.isEnd);
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                setTimeout(() => {
                  const currentVideo =
                    swiper.slides[swiper.activeIndex]?.querySelector("video");
                  currentVideo?.play();
                }, 300);
              }}
            >
              {videos.map((product, index) => (
                <SwiperSlide key={product.id} className="swiper-no-space">
                  <div
                    className="container mx-auto relative w-[280px] h-[640px] rounded-xl 
                  overflow-hidden shadow-lg bg-black"
                  >
                    <video
                      src={product.video}
                      controls
                      onEnded={() => handleVideoEnd(index)}
                      onError={(e) => console.error(`Video error: ${e}`)}
                      className="swiper-slide-video w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center z-10">
                      <i className="fas fa-eye mr-1" />
                      {product.views}
                    </div>
                    <div className="absolute right-2 top-1/3 flex flex-col items-center gap-2 text-white text-xl z-50">
                      <button className="flex flex-col items-center">
                       <FaHeart />
                      </button>
                      <button>
                      <HiMiniShare />
                      </button>
                    </div>

                    <div className="absolute bottom-[80px] left-1/2 transform -translate-x-1/2 w-[90%] z-10">
                      <div className="bg-white rounded-xl p-2 shadow-md flex flex-col items-center gap-2">
                        <div className="flex items-center gap-3 w-full">
                          <img
                            src={product.productImage}
                            alt={product.title}
                            className="w-14 h-14 object-contain"
                          />
                          <div className="flex flex-col">
                            <p className="font-semibold text-sm text-black">
                              {product.title}
                            </p>
                            <div className="text-base font-bold text-black">
                              ₹{product.price}
                              {product.originalPrice && (
                                <span className="text-gray-400 line-through text-sm ml-1">
                                  ₹{product.originalPrice}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <button className="bg-green-600 text-white w-full py-2 text-sm rounded">
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </>
  );
};

export default Transformation;
