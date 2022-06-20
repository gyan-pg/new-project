import { useState } from "react";

export const useTestHook = () => {
  const [num, setNum] = useState(0);
  const increase = () => {
    const newNum = num + 1;
    setNum(newNum);
  }
  const decrease = () => {
    const newNum = num - 1;
    setNum(newNum);
  }
  return { num, increase, decrease };
};