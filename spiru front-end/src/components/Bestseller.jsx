import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Heart, ShoppingCart } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { products_bestsellers } from "../constant/Constant";
import { useWishlist } from "./WishlistContext";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext";
const Bestsallers = () => {
    const { addToCart } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);
  const swiperRef = useRef(null);
  const { addToWishlist } = useWishlist();
  const nextSlide = () => swiperRef.current?.slideNext();
  const prevSlide = () => swiperRef.current?.slidePrev();
  const goToSlide = (index) => swiperRef.current?.slideTo(index * 4);
  const nevigate = useNavigate()

  const totalSlides = Math.ceil(products_bestsellers.length / 4);

  return (
    <section className="section5 container mx-auto py-10 bg-white">
      <div className="max-w-7xl mx-aut">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Bestsellers</h2>
          <div className="h-[2px] bg-green-700 w-[100px] mx-auto mb-8 rounded"></div>
        </div>

        <div className="relative">
          <button onClick={prevSlide} className="nav-button left">
            <ChevronLeft className="icon" />
          </button>
          <button onClick={nextSlide} className="nav-button right">
            <ChevronRight className="icon" />
          </button>

          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={25}
            loop={true}
            speed={500}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => {
              const group = swiper.params.slidesPerGroup;
              setCurrentSlide(Math.floor(swiper.realIndex / group));
            }}
            breakpoints={{
              640: { slidesPerView: 1, slidesPerGroup: 1 },
              768: { slidesPerView: 2, slidesPerGroup: 2 },
              1024: { slidesPerView: 3, slidesPerGroup: 3 },
              1280: { slidesPerView: 4, slidesPerGroup: 4 },
            }}
          >
            {products_bestsellers.map((product) => (
              <SwiperSlide onClick={()=>nevigate("/ProductPage")} key={product.id}>
                <div className="product-card">
                  <div className="product-image-wrapper">
                    <span className="discount-badge">{product.discount}</span>

                    <span>
                     <NavLink to='/wishlist'>
                       <Heart
                        className="wish-list"
                        onClick={() => addToWishlist(product)}
                      />
                     </NavLink>
                    </span>
                    <div className="image-container">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="product-image default-img"
                      />
                      <img
                        src={product.hoverImage}
                        alt={`${product.title} hover`}
                        className="product-image hover-img"
                      />
                    </div>
                  </div>
                  <div className="product-details">
                    <h3 className="product-title">{product.title}</h3>
                    <div className="product-prices">
                      <span className="original-price">
                        {product.originalPrice}
                      </span>
                      <span className="discounted-price">
                        {product.discountedPrice}
                      </span>
                    </div>
                  </div>
                  <div className="action-buttons">
                    <button onClick={() => addToCart(product)} className="cart-btn">
                      <ShoppingCart className="icon" />
                    </button>
                    <button className="buy-btn">BUY NOW</button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="dots-wrapper mt-6 flex justify-center gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`dot ${index === currentSlide ? "active" : ""}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Bestsallers;
