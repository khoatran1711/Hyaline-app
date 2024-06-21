import Slider from "react-slick";
import { globalNavigation } from "../../../asset/navigation/navigation";
import { PagePath } from "../../../constants/page-path.constant";
import { Product } from "../../models/product.model";
import "./style.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

interface ProductCardProps {
  product?: Product;
}

export const ProductCard = (props?: ProductCardProps) => {
  return (
    <div
      className="product-card w-[260px] h-[330px] bg-AquaHaze p-3 flex flex-col justify-between cursor-pointer"
      onClick={() => {
        globalNavigation(PagePath.ProductDetail + "/" + props?.product?.id);
      }}
    >
      <div className="w-full h-3/4 relative">
        <div className="">
          <Slider
            prevArrow={<PrevArrow />}
            nextArrow={<NextArrow />}
            infinite
            slidesToShow={1}
            slidesToScroll={1}
            arrows
          >
            <img
              src={props?.product?.imageUrl}
              className="w-full h-full object-contain"
            />

            {props?.product?.images?.map((e, i) => (
              <div key={i} className="p-4 w-full h-full">
                <div className="w-full h-full bg-gradient-to-br from-[#E4E2E1] to-[#F6F5F3] ">
                  <img src={e} className="w-full h-full object-cover" />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div>
        <div className="mt-3 line-clamp-2 cursor-pointer font-semibold mb-1">
          {props?.product?.name}
        </div>
        <div className="flex justify-between gap-2">
          <div className="w-[60%] text-sm"> {props?.product?.price}</div>

          <div className="flex-1 flex flex-wrap gap-1 justify-end items-end">
            {props?.product?.colors?.map((e) => (
              <ColorTag key={e?.id} value={e?.value} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ColorTag = ({ value }: { value?: string }) => {
  return (
    <div
      style={{
        backgroundColor: value,
      }}
      className="w-4 h-4 rounded-full border-[1px] border-gray-500"
    />
  );
};

const PrevArrow = (props: any) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        props?.onClick();
      }}
      className="prev absolute w-fit h-fit z-20 text-4xl top-[45%] -left-[8%] text-Bismark"
    >
      <MdOutlineKeyboardArrowLeft />
    </div>
  );
};

const NextArrow = (props: any) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        props?.onClick();
      }}
      className="next absolute w-fit h-fit z-20 text-4xl top-[45%] -right-[8%] text-Bismark"
    >
      <MdOutlineKeyboardArrowRight />
    </div>
  );
};
