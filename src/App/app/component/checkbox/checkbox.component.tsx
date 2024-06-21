import { cn } from "../../../asset/function/cn.function";

interface CheckboxProp {
  isCheck?: boolean;
  className?: string;
  title?: string;
  onCheck?: (e?: any) => void;
}

export const Checkbox = (props?: CheckboxProp) => {
  return (
    <div
      className={cn(
        "flex gap-2 items-center font-montserrat cursor-pointer",
        props?.className
      )}
      onClick={() => props?.onCheck && props?.onCheck()}
    >
      <div
        className={`w-4 h-4 rounded-full ${
          props?.isCheck ? "bg-Bismark" : "bg-Seashell"
        } `}
      />
      <div className="">{props?.title}</div>
    </div>
  );
};
