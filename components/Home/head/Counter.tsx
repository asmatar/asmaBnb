"use client";

import useCounter from "@/hooks/useCounter";

const Counter = ({ maximum, label }: { maximum: number; label: string }) => {
  const { count } = useCounter(maximum);
  return (
    <div className="text-center p-4 bg-background/80 backdrop-blur-sm rounded-xl shadow-sm">
      <p className="text-3xl font-bold text-primary">{count}+</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
};

export default Counter;
