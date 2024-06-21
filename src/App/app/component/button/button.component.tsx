import { ReactNode } from "react";
import { cn } from "../../../asset/function/cn.function";
import "../../app.style.scss";
import { LoadingCircle } from "../loading-circle/loading-circle.component";

interface ButtonProps {
  className?: string;
  onClick?: () => void;
  title?: string | ReactNode;
  disable?: boolean;
  isLoading?: boolean;
}

export const Button = (props?: ButtonProps) => {
  return (
    <div className={props?.disable ? "opacity-30 pointer-events-none" : ""}>
      <div
        className={cn("white-button cursor-pointer", props?.className)}
        onClick={() => props?.onClick && props?.onClick()}
      >
        {props?.isLoading ? (
          <div>
            <LoadingCircle />
          </div>
        ) : (
          <div className="px-5 py-2">{props?.title}</div>
        )}
      </div>
    </div>
  );
};
