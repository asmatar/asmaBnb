import { useState } from "react";

export const useActiveItem = <T,>() => {
  const [activeListItem, setActiveListItem] = useState<T | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, item: T) => {
    if (activeListItem === item) {
      setActiveListItem(null);
    } else {
      event.preventDefault();
      setActiveListItem(item);
    }
  };
  return { activeListItem, setActiveListItem, handleClick };
};
