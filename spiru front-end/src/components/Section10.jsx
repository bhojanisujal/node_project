import React from "react";
import { sec10Arr } from "../constant/Constant";

const Section10 = () => {
    return (
        <section className="Section10 container mx-auto balance-wrapper py-10">
            <div className="balance-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
             lg:grid-cols-4 gap-8 mt-10">
                {sec10Arr.map((item, idx) => (
                    <div className="balance-item text-center flex flex-col items-center" key={idx}>
                        <img src={item.icon} alt={item.title} className="balance-icon mb-6" />
                        <h3 className="balance-heading">{item.title}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Section10;
