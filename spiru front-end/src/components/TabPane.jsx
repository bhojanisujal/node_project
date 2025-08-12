import React, { useState } from 'react';
import { tabs_contents } from '../constant/Constant';
import { FaAngleRight } from 'react-icons/fa';

const TabPane = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="tabPane bg-[#f9fafb] py-12">
      <div className="container mx-auto">

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Why Choose SpiruSwastha?</h2>
          <div className="h-[2px] bg-green-700 w-[180px] mx-auto mb-8 rounded"></div>
        </div>

        {/* Tabs & Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Tab Buttons */}
          <div className="tab-buttons flex flex-col gap-4 w-full lg:w-1/3">
            {tabs_contents.map((tab, idx) => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === idx ? 'active' : ''}`}
                onClick={() => setActiveTab(idx)}
              >
                <span className="tab-title">{tab.title}</span>
                <span className="arrow-circle">
                  <FaAngleRight />
                </span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="tab-content-wrapper w-full lg:w-2/3 flex flex-col lg:flex-row gap-6 items-start">
            <img
              src={tabs_contents[activeTab].image}
              alt="Tab Visual"
              className="tab-image rounded-lg w-full lg:w-1/2 max-w-full"
            />
            <p className="tab-description text-gray-700 text-sm leading-relaxed whitespace-pre-line w-full lg:w-1/2">
              {tabs_contents[activeTab].content}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TabPane;
