import { MouseEvent, memo, useEffect } from "react";
import { cn } from "../utils/lib/cn";
import { productNavItems } from "../constants/productItems";
import useActiveProductNav from "../hooks/useActiveProductNav";
import { textTitle4 } from "../constants/styles";

type Props = {
  switchHandler: (id: string) => void;
};

const ProductNavbar = ({ switchHandler }: Props) => {
  const { activeProductNavIdx, handleActiveProductNavIdx } = useActiveProductNav();

  useEffect(() => {
    handleActiveProductNavIdx();
  }, []);

  const handleSwitch = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    switchHandler(id);
    handleActiveProductNavIdx(id);
  };

  return (
    <nav className="sticky top-2 z-50 bg-main-brown-100 dark:bg-main-brown-900 p-4 pt-4 shadow-box-shadow-1 rounded-small overflow-x-auto">
      <ul className="flex gap-5 min-w-[42.5rem] justify-between">
        {productNavItems.map(({ id, link, name }, idx) => {
          const isActive = activeProductNavIdx === idx;
          return (
            <li
              key={id}
              className={cn(
                "transition-all duration-300 cursor-pointer flex-1 max-w-fit",
                textTitle4
              )}
            >
              <a
                className={cn(
                  "pb-1 transition-[color] duration-300 text-main-secondary-text/70 hover:text-main-secondary-text/90",
                  isActive &&
                  "border-b-2 border-main-primary-text text-main-primary-text hover:text-main-secondary-text"
                )}
                href={"#" + link}
                onClick={(e) => handleSwitch(e, link)}
              >
                {name}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default memo(ProductNavbar);
