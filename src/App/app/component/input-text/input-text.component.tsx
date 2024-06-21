import { Input } from "antd";
import "./style.scss";
import { cn } from "../../../asset/function/cn.function";

interface InputTextProps {
  placeHolder?: string;
  title?: string;
  inputClassName?: string;
  className?: string;
  isPassword?: boolean;
  onChange?: (e?: any) => void;
}

export const InputText = (props?: InputTextProps) => {
  return (
    <div className="w-full">
      <div className={cn("py-1 font-semibold", props?.inputClassName)}>
        {props?.title}
      </div>

      <Input
        onChange={props?.onChange}
        className={cn("w-full py-2 font-montserrat text-base")}
        placeholder={props?.placeHolder}
        type={props?.isPassword ? "password" : "text"}
      />
    </div>
  );
};
