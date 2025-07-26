import React from "react";

const TailwindTest: React.FC = () => {
  return (
    <div className="bg-primary text-white p-4 rounded-lg shadow-lg mb-4">
      <h3 className="text-lg font-bold">Tailwind CSS Test</h3>
      <p className="text-sm">If you can see this blue background, Tailwind CSS is working!</p>
    </div>
  );
};

export default TailwindTest;