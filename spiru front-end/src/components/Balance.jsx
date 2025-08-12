import React from "react";
import { balanceArr } from "../constant/Constant";

const Balance = () => {
  return (
    <section className="section6 container mx-auto balance-wrapper px-4 sm:px-8 py-10">

      <div className="text-center">
        <h2 className="balance-title mb-3">4 Balance</h2>
        <div className="h-[2px] bg-green-700 w-[100px] mx-auto mb-8 rounded"></div>
      </div>

      <div className="balance-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-10">
        {balanceArr.map((item, idx) => (
          <div className="balance-item" key={idx}>
            <img src={item.icon} alt={item.title} className="balance-icon" />
            <h3 className="balance-heading">{item.title}</h3>
            <p className="balance-description">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Balance;
