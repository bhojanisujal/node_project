import React from "react";
import offersbg from "../assets/images/offersbg.jpg";

const Offers = () => {
  return (
    <div
      className="Offers w-full relative py-25 overflow-hidden text-center"
      style={{
        backgroundImage: `url(${offersbg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-6">
        Stay Up to Date with All News <br className="hidden md:block" />
        and Exclusive Offers
      </h2>

      <form className="offers-form relative max-w-xl mx-auto">
        <input
          type="email"
          placeholder="Your email address"
          className="offers-input w-full px-4 py-3 pr-36 rounded-full border outline-none text-sm"
        />
        <button
          type="submit"
          className="offers-button absolute right-1 top-1 bottom-1 px-6 rounded-full font-semibold text-sm"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Offers;
