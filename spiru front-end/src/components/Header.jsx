import React from "react";
import { FaStar } from "react-icons/fa";

const Header = () => {
    return (
        <div className="bg-green-700 flex items-center justify-center section1">
            <div className="overflow-hidden w-full">
                <div className="flex animate-roll">

                    {/* 1. Cash on delivery */}
                    <span className="text-white w-[250px] sm:w-[300px] md:w-[400px] shrink-0 text-xs sm:text-sm whitespace-nowrap flex items-center">
                        <span className="mr-2 text-2xl sm:text-3xl align-middle leading-none">•</span>
                        Cash on delivery available
                    </span>

                    {/* 2. 4.8 stars */}
                    <span className="text-white w-[250px] sm:w-[300px] md:w-[400px] shrink-0 text-xs sm:text-sm whitespace-nowrap flex items-center">
                        <span className="mr-2 text-2xl sm:text-3xl align-middle leading-none">•</span>
                        4.8 Stars across 20k reviews{" "}
                        <span className="text-white ml-1 text-[10px] sm:text-xs">
                            <FaStar className="inline" />
                            <FaStar className="inline" />
                            <FaStar className="inline" />
                            <FaStar className="inline" />
                            <FaStar className="inline" />
                        </span>
                    </span>

                    {/* 3. Free shipping */}
                    <span className="text-white w-[250px] sm:w-[300px] md:w-[400px] shrink-0 text-xs sm:text-sm whitespace-nowrap flex items-center">
                        <span className="mr-2 text-2xl sm:text-3xl align-middle leading-none">•</span>
                        Free shipping all over India above ₹500
                    </span>

                    {/* Duplicates for loop effect */}
                    <span className="text-white w-[250px] sm:w-[300px] md:w-[400px] shrink-0 text-xs sm:text-sm whitespace-nowrap flex items-center" aria-hidden="true">
                        <span className="mr-2 text-2xl sm:text-3xl align-middle leading-none">•</span>
                        Cash on delivery available
                    </span>

                    <span className="text-white w-[250px] sm:w-[300px] md:w-[400px] shrink-0 text-xs sm:text-sm whitespace-nowrap flex items-center">
                        <span className="mr-2 text-2xl sm:text-3xl align-middle leading-none">•</span>

                        4.8 Stars across 20k reviews{" "}
                        <span className="text-white ml-1 text-[10px] sm:text-xs">
                            <FaStar className="inline" />
                            <FaStar className="inline" />
                            <FaStar className="inline" />
                            <FaStar className="inline" />
                            <FaStar className="inline" />
                        </span>
                    </span>

                </div>
            </div>
        </div>
    );
};

export default Header;
