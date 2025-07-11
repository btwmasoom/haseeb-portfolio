"use client";

import { useEffect, useState } from "react";

export const useMounted = () => {
  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
};
// component ka dom manupulation m render hota hai 
// server se aata hai or mount ho gaya hai
// 11:52 -> 11:52:01 process hua delay 
// useeffect run ho chuka hai use mount ka hook bana diya 