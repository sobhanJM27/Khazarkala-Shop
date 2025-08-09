import { mainBorder } from "../../constants/styles";
import { cn } from "../../utils/lib/cn";

type Props = {
  className?: string;
  id?: string;
  state: boolean;
  onChange: () => void;
  checked?: boolean;
  component1: JSX.Element;
  component2: JSX.Element;
};

const Switch = ({ state, onChange, component1, component2, id }: Props) => {
  return (
    <div className="h-full relative inline-block align-middle select-none">
      <input
        type="checkbox"
        name={id + "-toggle"}
        id={id + "-toggle"}
        className="hidden appearance-none"
        checked={state}
        onChange={onChange}
      />
      <label
        htmlFor={id + "-toggle"}
        className={cn(
          "flex items-center cursor-pointer gap-2 rounded-small py-1 px-1",
          mainBorder
        )}
      >
        <div className="p-1 w-6 group-hover:scale-150">{component1}</div>
        <div className="p-1 w-6">{component2}</div>
        <span
          className={cn(
            "absolute inline-block w-7 h-7 -z-10 bg-main-brown-300 transition-all duration-200 ease-in-out rounded-[10px]",
            mainBorder,
            state ? "right-1 left-[35px]" : "left-1 right-[35px]"
          )}
        ></span>
      </label>
    </div>
  );
};

export default Switch;
