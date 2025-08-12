import React from "react";
import one from '../assets/icone_p/svgviewer-png-output.png';
import two from '../assets/icone_p/svgviewer-png-output -1.png';
import three from '../assets/icone_p/svgviewer-png-output -2.png';
import four from '../assets/icone_p/svgviewer-png-output -3.png';
// // .png
const features = [
  {
    icon:one,
    title: "Health Outcomes",
    description: "Ayurvedic solutions delivered thoughtfully",
  },
  {
    icon: two,
    title: "Bespoke Ayurveda",
    description: "Programs Crafted by Ayurvedacharyas",
  },
  {
    icon:three ,
    title: "Real Assistance",
    description: "Ayurvedic Health Experts",
  },
  {
    icon:four ,
    title: "Natural Ingredients",
    description: "Carefully handpicked and sourced",
  },
];

const WhySpiruSwastha = () => {
  return (
    <section className="py-10 bg-white text-center">
      <h2 className="text-3xl font-bold mb-8">
        Why <span className="text-black underline underline-offset-4">SpiruSwastha?</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-green-50 rounded-xl p-6 flex flex-col items-center shadow-sm hover:shadow-md transition"
          >
           <img src= {feature.icon} alt="" />
            <h3 className="mt-4 text-lg font-semibold text-black">{feature.title}</h3>
            <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhySpiruSwastha;
