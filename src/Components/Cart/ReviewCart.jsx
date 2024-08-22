import React from 'react';

const ReviewCart = ({review}) => {
    const {comment, reting} = review
  return (
    <div className="card bg-base-100 p-4 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          {/* Star Rating */}
          <div className="rating flex items-center">
            {[...Array(5)].map((_, i) => (
              <input
                key={i}
                type="radio"
                name="rating-5"
                className="mask mask-star-2 bg-orange-400 w-5"
                checked
                readOnly
              />
            ))}
          </div>
          <span className="ml-2 text-lg font-bold">5.0</span>
        </div>
        <div className="text-sm text-gray-500">12, Nov 2025</div>
      </div>
      <div className="mb-4">
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ac risus ac risus elementum vehicula. Class aptent taciti sociosqu ad litora torquent per.
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {/* User Info */}
          <div className="avatar">
            <div className="w-8 rounded-full">
              <img src="https://via.placeholder.com/150" alt="User Avatar" />
            </div>
          </div>
          <span className="ml-2 text-sm font-medium">Wilium Heli</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center text-gray-500">
            <i className="far fa-thumbs-up"></i>
            <span className="ml-1">35</span>
          </div>
          <button className="text-blue-500 hover:underline text-sm">Reply</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCart;
