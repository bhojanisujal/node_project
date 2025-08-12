import React from 'react';
import { FiUser } from 'react-icons/fi';

const reviewsData = [
  {
    name: 'Sameer Verma',
    rating: 4,
    title: 'Solid Daily Supplement, Be Consistent',
    content:
      'This is a good, reliable daily supplement that covers a lot of nutritional bases. It took about 2–3 weeks of consistent daily use for me to really feel the difference in my energy, so you have to be patient. But it works.',
  },
  {
    name: 'Vikram Singh',
    rating: 5,
    title: 'Perfect for Post-Workout Recovery',
    content:
      'I add these capsules to my post-workout routine. The high protein content really helps with muscle recovery, and I feel less sore the next day. A clean and natural supplement for anyone who is active.',
  },
  {
    name: 'Neha Joshi',
    rating: 5,
    title: 'My Daily Green Superfood Shot',
    content:
      'It’s like having a green smoothie condensed into a tiny, easy-to-swallow capsule. It’s my daily dose of superfood that keeps me going. The quality from SpiruSwastha seems excellent and the capsules are easy to digest.',
  },
];

const ratingStats = [
  { stars: 5, count: 110 },
  { stars: 4, count: 16 },
  { stars: 3, count: 2 },
  { stars: 2, count: 0 },
  { stars: 1, count: 0 },
];

const totalReviews = 128;
const averageRating = 4.84;

const StarRating = ({ rating }) => (
  <div className="flex text-yellow-500 text-base space-x-0.5" aria-label={`${rating} stars`}>
    {[...Array(5)].map((_, i) => (
      <span key={i}>{i < rating ? '★' : '☆'}</span>
    ))}
  </div>
);

const RatingBar = ({ stars, count }) => {
  const percentage = (count / totalReviews) * 100;
  return (
    <div className="flex items-center space-x-2">
      <div className="w-20 flex text-yellow-500 text-sm">
        {[...Array(5)].map((_, i) => (
          <span key={i}>{i < stars ? '★' : '☆'}</span>
        ))}
      </div>
      <div className="w-full bg-gray-200 h-2 rounded">
        <div className="h-2 bg-green-600 rounded" style={{ width: `${percentage}%` }} />
      </div>
      <span className="text-sm text-gray-700 w-8 text-right">{count}</span>
    </div>
  );
};

const ReviewCard = ({ name, rating, title, content }) => (
  <div className="border-b pb-6">
    <StarRating rating={rating} />
    <div className="mt-2 font-semibold text-green-600 flex items-center">
      <span className="mr-2 text-xl"><FiUser /></span>
      {name}
    </div>
    <h3 className="mt-2 font-semibold text-gray-800">{title}</h3>
    <p className="mt-1 text-gray-700">{content}</p>
  </div>
);

const CustomerReviews = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      {/* Centered Title */}
      <h2 className="text-3xl font-bold text-center mb-2">Customer Reviews</h2>
      <div className="w-24 h-1 bg-green-600 mx-auto mb-10 rounded" />

      {/* Summary Layout */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-10 border-b pb-6 text-center md:text-left">
  {/* Left: Average Rating */}
  <div className="space-y-2  md:pr-6">
    <div className="flex justify-center md:justify-start text-yellow-500 text-lg">
      {'★'.repeat(5)}
    </div>
    <p className="text-xl font-bold">{averageRating} out of 5</p>
    <p className="text-sm text-gray-600 flex items-center justify-center md:justify-start gap-1">
      Based on {totalReviews} reviews <span className="text-green-500">✅</span>
    </p>
  </div>

  {/* Center: Rating Bars */}
  <div className="space-y-2 md:px-6 ">
    {ratingStats.map((stat) => {
      const percentage = (stat.count / totalReviews) * 100;
      return (
        <div key={stat.stars} className="flex items-center space-x-2">
          <span className="w-14 text-sm text-yellow-500">{'★'.repeat(stat.stars)}</span>
          <div className="flex-1 bg-gray-200 h-2 rounded">
            <div
              className="h-2 bg-green-600 "
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="w-6 text-sm font-medium text-gray-700 text-right">{stat.count}</span>
        </div>
      );
    })}
  </div>

  {/* Right: Write Review Button */}
  <div className="flex justify-center md:justify-end items-start md:pl-6">
    <button className="bg-green-700 hover:bg-green-800 text-white font-bold px-6 py-2  shadow">
      Write a review
    </button>
  </div>
</div>




      {/* Sort Option */}
      <div className="pt-4 text-sm text-green-700 font-semibold flex items-center gap-1">
        <span>Most Recent</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Reviews List */}
      <div className="mt-6 space-y-8">
        {reviewsData.map((review, idx) => (
          <ReviewCard key={idx} {...review} />
        ))}
      </div>
    </section>
  );
};

export default CustomerReviews;
