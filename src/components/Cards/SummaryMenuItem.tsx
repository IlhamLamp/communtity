import React from "react";

const SummaryMenuItem = () => {
  return (
    <div className="text-white p-4 lg:p-6 rounded-lg flex justify-around items-center gap-4 lg:gap-8">
      <div className="text-center">
        <h2 className="text-2xl lg:text-3xl font-bold text-yellow-400">869</h2>
        <p className="text-xs lg:text-sm font-semibold">Total Applications</p>
        <p className="text-xs text-gray-400">Oct 18, 2020 - Present</p>
      </div>

      <div className="text-center">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-4 border-yellow-400 flex items-center justify-center">
            <h2 className="text-2xl font-bold text-yellow-400">0</h2>
          </div>
          <span className="absolute -top-2 text-yellow-400 text-xl">
            &#128293;
          </span>
        </div>
        <p className="text-xs lg:text-sm font-semibold text-blue-400 mt-2">
          Active Projects
        </p>
        <p className="text-xs text-gray-400">Jan 8</p>
      </div>

      <div className="text-center">
        <h2 className="text-2xl lg:text-3xl font-bold text-yellow-400">107</h2>
        <p className="text-xs lg:text-sm font-semibold">Projects Saved</p>
        <p className="text-xs text-gray-400">Sep 15, 2024 - Dec 30, 2024</p>
      </div>
    </div>
  );
};

export default SummaryMenuItem;
