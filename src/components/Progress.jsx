import React from "react";

const Progress = ({ totalStep, currentStep }) => {
  // logic
  const width = (currentStep / totalStep) * 100;

  // view
  return (
    <div className="w-full h-6 bg-white border-2 rounded-xl border-mbti-gray relative">
      <div
        className="absolute w-11 top-1/2 transition-all transform -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${width}%` }}
      >
        <img
          src="./images/progress.png"
          className="block w-full h-auto"
          alt="status 이미지"
        />
      </div>
      <div className="w-full h-full rounded-xl overflow-hidden">
        <span
          className="block h-full bg-mbti-pink transition-all"
          style={{ width: `calc(${width}% + 5px)` }}
        ></span>{" "}
        {/* status */}
      </div>
    </div>
  );
};

export default Progress;
