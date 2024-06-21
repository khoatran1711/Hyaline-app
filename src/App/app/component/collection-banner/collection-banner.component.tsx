import { globalNavigation } from "../../../asset/navigation/navigation";
import { PagePath } from "../../../constants/page-path.constant";
import { Collection } from "../../models/collection.model";

interface CollectionBannerProps {
  collection?: Collection;
}

export const CollectionBanner = (props?: CollectionBannerProps) => {
  return (
    <>
      <div className="text-lg md:text-xl top-10 text-center px-[3%]">
        {props?.collection?.description}
      </div>
      <div
        style={{
          backgroundImage: `url('${props?.collection?.imageUrl}')`,
        }}
        className="w-full h-[200px] md:h-[350px] bg-AquaHaze flex justify-center relative bg-fixed bg-center"
      >
        <div
          style={{
            boxShadow: "inset 0 0 0 1px white",
          }}
          className="max-w-[80%] text-white py-2 font-semibold bg-[#00000015] backdrop-blur-sm px-5 w-fit h-fit self-end mb-4 md:mb-10 text-sm md:text-base cursor-pointer"
          onClick={() =>
            globalNavigation(PagePath.Collection + "/" + props?.collection?.id)
          }
        >
          {props?.collection?.name}
        </div>
      </div>
    </>
  );
};
