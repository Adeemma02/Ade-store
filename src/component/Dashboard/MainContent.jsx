import React from "react";

const MainContent = ({ children }) => {
  return (
    <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
      <div className="max-w-7xl mx-auto">{children}</div>
    </main>
  );
};

export default MainContent;
