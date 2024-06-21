import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product, ProductSize } from "../../models/product.model";
import { ProductService } from "../../services/product.service";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { ConfigProvider, Drawer } from "antd";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Color } from "../../models/color.model";
import { Button } from "../../component/button/button.component";
import { FaRegHeart } from "react-icons/fa6";

export const ProductDetailPage = () => {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState<Product>();
  const [sizeSelected, setSizeSelected] = useState<string>();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [colorSelected, setColorSelected] = useState<string>();
  const [openDrawerColor, setOpenDrawerColor] = useState(false);
  const [productQuantity, setProductQuantity] = useState<number>();
  const productService = new ProductService();

  const chooseSize = (id?: string) => {
    if (!id) return;

    if (sizeSelected !== id) {
      setSizeSelected(id);
    }
  };

  const chooseColor = (id?: string) => {
    if (!id) return;

    if (colorSelected !== id) {
      setColorSelected(id);
    }
  };

  useEffect(() => {
    productService.getProductDetail(id).then((res) => {
      if (res?.isSuccess && res?.data?.isSuccess) {
        const data = res?.data?.data;
        if (data) {
          setProductDetail(data);
          data.colors && setColorSelected(data.colors[0]?.id);
          data.productSizes && setSizeSelected(data.productSizes[0]?.id);
        }
      } else {
        //log error
        window.alert(res?.error || res?.data?.message);
      }
    });
  }, [id]);

  useEffect(() => {
    id &&
      productService
        .getProductQuantity(id, colorSelected, sizeSelected)
        .then((res) => {
          if (res?.isSuccess && res?.data?.isSuccess) {
            const data = res?.data?.data;
            if (data) {
              setProductQuantity(data.amount);
            }
          } else {
            //log error
            window.alert(res?.error || res?.data?.message);
          }
        });
  }, [id, colorSelected, sizeSelected]);

  return (
    <>
      <div className="w-full mt-24 relative">
        <SizeDrawer
          sizes={productDetail?.productSizes}
          isOpen={openDrawer}
          onClose={() => setOpenDrawer(false)}
          onChoose={(e) => chooseSize(e)}
          idSelected={sizeSelected}
        />

        <ColorDrawer
          colors={productDetail?.colors}
          isOpen={openDrawerColor}
          onClose={() => setOpenDrawerColor(false)}
          onChoose={(e) => chooseColor(e)}
          idSelected={colorSelected}
        />

        <div className="flex w-full gap-3 relative">
          <div className="flex-1">
            {productDetail?.images?.map((e) => (
              <div className="w-full h-screen bg-gradient-to-br from-[#E4E2E1] to-[#F6F5F3]">
                <div
                  style={{
                    backgroundImage: `url(${e})`,
                  }}
                  className="w-full h-full bg-cover"
                />
              </div>
            ))}
          </div>

          <div className="w-1/2 font-montserrat sticky top-24 h-fit ">
            <div className="w-full text-center flex flex-col items-center justify-center gap-2 px-10">
              <div className="w-full text-xl md:text-2xl justify-end flex">
                <FaRegHeart className="cursor-pointer" />
              </div>

              <div className="font-medium md:text-lg">
                {productDetail?.code}
              </div>

              <div className="font-semibold text-4xl md:text-5lg">
                {productDetail?.name}
              </div>

              <div className="text-lg md:text-xl"> {productDetail?.price}</div>

              <div className="text-sm md:text-base">
                {productDetail?.description}
              </div>

              <div className="grid grid-cols-2 gap-5 w-full text-left my-6 ">
                {productDetail?.attributes?.map((e) => (
                  <div className="w-full border-b-[1px] border-Bismark flex items-end">
                    {e}
                  </div>
                ))}
              </div>

              {productDetail?.productSizes?.length ? (
                <div
                  className="w-full flex gap-3 justify-between items-center border-b-[1px] border-Bismark cursor-pointer"
                  onClick={() => setOpenDrawer(true)}
                >
                  <div className="text-lg">Kích thước</div>

                  <div className="flex gap-1 items-center">
                    Size:{" "}
                    {productDetail?.productSizes?.find(
                      (e) => e.id === sizeSelected
                    )?.name || "Kích thước"}
                    <MdOutlineKeyboardArrowRight />
                  </div>
                </div>
              ) : (
                <></>
              )}

              {productDetail?.colors?.length ? (
                <div
                  className="w-full flex gap-3 justify-between items-center border-b-[1px] border-Bismark cursor-pointer my-3"
                  onClick={() => setOpenDrawerColor(true)}
                >
                  <div className="text-lg">Màu sắc</div>

                  <div className="flex gap-1 items-center">
                    <div className="flex gap-1 items-center">
                      <div
                        style={{
                          backgroundColor: productDetail?.colors?.find(
                            (e) => e.id === colorSelected
                          )?.value,
                        }}
                        className="w-4 h-4 bg-black rounded-full border-[1px] border-gray-500"
                      ></div>

                      {productDetail?.colors?.find(
                        (e) => e.id === colorSelected
                      )?.name || "Màu sắc"}
                    </div>
                    <MdOutlineKeyboardArrowRight />
                  </div>
                </div>
              ) : (
                <></>
              )}

              <div className="w-full flex gap-3 justify-center items-end relative">
                <Button
                  title="Đặt hàng ngay"
                  className="px-20 py-3"
                  disable={productQuantity ? false : true}
                  onClick={() => window.alert("oke")}
                />
                <div className="absolute right-0">
                  Số lượng: {productQuantity}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

interface SizeDrawerProps {
  sizes?: ProductSize[];
  idSelected?: string;
  onChoose?: (e: any) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const SizeDrawer = (props?: SizeDrawerProps) => {
  const onClick = (id?: string) => {
    props?.onChoose && props?.onChoose(id);
  };

  return (
    <SwipeableDrawer
      anchor={"right"}
      open={props?.isOpen}
      onClose={() => props?.onClose && props?.onClose()}
      onOpen={() => console.log("okee")}
    >
      <div className="px-10 py-4 flex flex-col max-w-[700px] min-w-[500px]">
        <div className="font-semibold text-3xl font-montserrat pt-10">
          Kích thước
        </div>

        <div className="flex gap-3 mt-10 flex-wrap w-full">
          {props?.sizes?.map((e) => (
            <div
              onClick={() => onClick(e.id)}
              className={`${
                props?.idSelected === e.id
                  ? "font-semibold border-gray-400"
                  : "text-gray-400"
              } px-3 py-2 border-[1px] rounded cursor-pointer font-montserrat min-w-[100px] text-center`}
            >
              {e.name}
            </div>
          ))}
        </div>
      </div>
    </SwipeableDrawer>
  );
};

interface ColorDrawerProps {
  colors?: Color[];
  idSelected?: string;
  onChoose?: (e: any) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const ColorDrawer = (props?: ColorDrawerProps) => {
  const onClick = (id?: string) => {
    props?.onChoose && props?.onChoose(id);
  };

  return (
    <SwipeableDrawer
      anchor={"right"}
      open={props?.isOpen}
      onClose={() => props?.onClose && props?.onClose()}
      onOpen={() => console.log("okee")}
    >
      <div className="px-10 py-4 flex flex-col max-w-[700px] min-w-[500px]">
        <div className="font-semibold text-3xl font-montserrat pt-10">
          Màu sắc
        </div>

        <div className="flex gap-3 mt-10 flex-wrap w-full">
          {props?.colors?.map((e) => (
            <div
              onClick={() => onClick(e.id)}
              className={`${
                props?.idSelected === e.id
                  ? "font-semibold border-gray-400"
                  : "text-gray-400"
              } px-3 py-2 border-[1px] rounded cursor-pointer font-montserrat min-w-[100px] text-center flex flex-col items-center justify-center`}
            >
              <div
                style={{
                  background: e.value,
                }}
                className="w-20 h-20 mb-2"
              />
              {e.name}
            </div>
          ))}
        </div>
      </div>
    </SwipeableDrawer>
  );
};
