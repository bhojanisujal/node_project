import React from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { products_bestsellers } from "../constant/Constant";

const NewLaunches = () => {
  return (
    <section className="secNewLaunches container mx-auto bg-white mb-10">
      <div className="max-w-7xl mx-auto px-4">

         <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">New Launches</h2>
          <div className="h-[2px] bg-green-700 w-[100px] mx-auto mb-8 rounded"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {products_bestsellers.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-image-wrapper">
                <span className="discount-badge">{product.discount}</span>
                <span><Heart className="wish-list"/></span>
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
                <button className="cart-btn">
                  <ShoppingCart className="icon" />
                </button>
                <button className="buy-btn">BUY NOW</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewLaunches;
