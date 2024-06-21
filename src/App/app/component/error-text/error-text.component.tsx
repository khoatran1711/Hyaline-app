interface ErrorTextProp {
  text?: string;
  isShow?: boolean;
}

export const ErrorText = (props?: ErrorTextProp) => {
  return (
    <div className={`${!props?.isShow && "hidden"} text-red-600 text-sm`}>
      {props?.text}
    </div>
  );
};
