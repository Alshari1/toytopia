import React from 'react';
import './page404.css'; // Import the CSS for animations

const Error404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-[#23395d]">ERROR</h1>
      <div className="relative">
        <div className="text-9xl font-extrabold text-[#23395d] flex justify-center items-center space-x-2">
          <div className="icon-container animate-spin-slow">
            <img src="/path/to/your/icon1.png" alt="Icon 1" className="w-16 h-16" />
          </div>
          <span className="text-[#23395d] animate-pulse">4</span>
          <div className="icon-container animate-bounce">
            <img src="/path/to/your/icon2.png" alt="Icon 2" className="w-16 h-16" />
          </div>
          <span className="text-[#23395d] animate-pulse">0</span>
          <div className="icon-container animate-spin">
            <img src="/path/to/your/icon3.png" alt="Icon 3" className="w-16 h-16" />
          </div>
          <span className="text-[#23395d] animate-pulse">4</span>
        </div>
      </div>
      <p className="text-xl text-[#23395d] mt-4">This page is outside of the Universe</p>
      <p className="text-center text-gray-500 mt-2">The page you are trying to access does not exist or has been moved. Try going back to our homepage.</p>
      <button className="btn btn-primary mt-6 bg-green-500 border-none">Homepage</button>
      <p className="text-gray-500 mt-2">If you think this is an error, contact our support team at <a href="mailto:support@flaticon.com" className="text-blue-500">support@flaticon.com</a></p>
    </div>
  );
};

export default Error404;
