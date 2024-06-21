import { CircularProgress } from "@mui/material";

export const LoadingCircle = () => {
  return (
    <div className="w-full flex justify-center group h-full px-5 py-2">
      <CircularProgress
        size={20}
        className="!text-black group-hover:!text-white"
      />
    </div>
  );
};
