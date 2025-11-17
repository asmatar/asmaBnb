import React from "react";

const titles = ({ children }: { children: React.ReactNode }) => {
  return (
    <h2 className="text-2xl font-semibold">
      <span className="text-accent-gradient">{children}</span>
    </h2>
  );
};

export default titles;
