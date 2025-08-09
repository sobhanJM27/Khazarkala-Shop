import { useState } from "react";
import { productNavItems } from "../constants/productItems";

export default function useActiveProductNav() {
  const [activeProductNavIdx, setActiveProductNavIdx] = useState(0);
  const handleActiveProductNavIdx = (id?: string) => {
    if (id)
      return setActiveProductNavIdx(
        productNavItems.findIndex((item) => item.link === id)
      );
    const hash = window.location.hash;
    if (hash) {
      const hashVal = hash.split("#")[1];
      let activeIndex = productNavItems.findIndex(
        (item) => item.link === hashVal
      );
      activeIndex = activeIndex === -1 ? 0 : activeIndex;
      setActiveProductNavIdx(activeIndex);
    }
  };
  return { activeProductNavIdx, handleActiveProductNavIdx };
}
