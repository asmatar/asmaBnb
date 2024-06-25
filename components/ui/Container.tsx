import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-[1920px] w-full max-auto xl:px-20 px-4 py-4 bg-secondary">
      {children}
    </div>
  );
};

export default Container;
