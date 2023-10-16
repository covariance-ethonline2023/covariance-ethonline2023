import React from 'react';

const CircularProgress = ({ progress }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-16 h-16">
      <svg className="absolute top-0 left-0" width="100" height="100">
        <circle
          className="text-red-300"
          strokeWidth="10"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
        />
        <circle
          className="text-blue-500"
          strokeWidth="10"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-xl font-bold">
        {progress}%
      </div>
    </div>
  );
};

export default CircularProgress;
