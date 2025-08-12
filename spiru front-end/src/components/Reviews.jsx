import React, { useState } from "react";
import { Building2, ChevronLeft, ChevronRight } from "lucide-react";
import reviewBG from "../assets/images/reviewBG.jpg";
const reviews = [
  {
    id: 1,
    name: "NFC CARD",
    date: "May 8, 2025",
    rating: 5,
    text: "Organic Superfood manufacturer with good ethics",
    avatar: "N",
  },
  {
    id: 2,
    name: "vishya vaghani",
    date: "May 3, 2025",
    rating: 5,
    text: "I've been using this shampoo for a while now, and I have to say, it's made a huge difference in the...",
    avatar: "V",
  },
  {
    id: 3,
    name: "krishna kukadiya",
    date: "May 3, 2025",
    rating: 5,
    text: "Excellent quality products with natural ingredients. Highly recommended for anyone looking for organic solutions.",
    avatar: "K",
  },
  {
    id: 4,
    name: "chetna",
    date: "May 2, 2025",
    rating: 5,
    text: "Nice natural hair oil and shampoo",
    avatar: "C",
  },
  {
    id: 5,
    name: "Vidhisha",
    date: "May 2, 2025",
    rating: 5,
    text: "Nice natural hair oil and shampoo",
    avatar: "C",
  },
  {
    id: 6,
    name: "Heer",
    date: "May 2, 2025",
    rating: 5,
    text: "Nice natural hair oil and shampoo",
    avatar: "C",
  },
  {
    id: 7,
    name: "krishna kukadiya",
    date: "May 3, 2025",
    rating: 5,
    text: "Excellent quality products with natural ingredients. Highly recommended for anyone looking for organic solutions.",
    avatar: "K",
  },
  {
    id: 8,
    name: "chetna",
    date: "May 2, 2025",
    rating: 5,
    text: "Nice natural hair oil and shampoo",
    avatar: "C",
  },
];

const StarRating = ({ rating }) => (
  <div className="flex gap-1">
    {[...Array(rating)].map((_, i) => (
      <span key={i} className="text-yellow-400 text-lg">
        ★
      </span>
    ))}
  </div>
);

const Reviews = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const visibleReviews = 3;

  // Total number of full pages
  const maxSlide = Math.ceil(reviews.length / visibleReviews) - 1;

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlide));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="reviews container mx-auto py-1">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            What Our Clients
          </h2>
          <div className="h-[2px] bg-green-700 w-[100px] mx-auto mb-8 rounded"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Company Info */}
          <div className="lg:w-1/4 w-full">
            <div className="py-6 px-0">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 flex items-center justify-center">
                  <img
                    src={reviewBG}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1">
                    SPIRU SWASTHA INDIA
                    <br />
                    PRIVATE LIMITED
                  </h3>
                  <StarRating rating={5} />
                  <p className="text-gray-600 text-sm mt-1 font-medium">
                    10 Google Reviews
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Carousel */}
          <div className="lg:w-3/4 w-full relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{
                  width: `${(reviews.length / visibleReviews) * 100}%`,
                  transform: `translateX(-${
                    (100 / (reviews.length / visibleReviews)) * currentSlide
                  }%)`,
                }}
              >
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="px-2"
                    style={{ width: `${100 / visibleReviews}%` }}
                  >
                    <div className="bg-[#f6f6f8] rounded-2xl p-6 border border-gray-100 h-full">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center text-white font-semibold text-sm">
                          {review.avatar}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm">
                            {review.name}
                          </h4>
                          <p className="text-gray-500 text-xs">{review.date}</p>
                        </div>
                      </div>
                      <StarRating rating={review.rating} />
                      <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                        {review.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="absolute left-[-25px] top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center
                 transition disabled:opacity-50 disabled:cursor-not-allowed z-10"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 hover:text-black" />
            </button>

            <button
              onClick={nextSlide}
              disabled={currentSlide >= maxSlide}
              className="absolute right-[-25px] top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center
                  transition disabled:opacity-50 disabled:cursor-not-allowed z-10"
            >
              <ChevronRight className="w-5 h-5 text-gray-400 hover:text-black" />
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {[...Array(maxSlide + 1)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentSlide === index ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
