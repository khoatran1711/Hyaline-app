import { useEffect, useRef, useState } from "react";
import { CollectionService } from "../../services/collection.service";
import { Collection, CollectionCategory } from "../../models/collection.model";
import { useParams } from "react-router-dom";
import { Product } from "../../models/product.model";
import { globalNavigation } from "../../../asset/navigation/navigation";
import { PagePath } from "../../../constants/page-path.constant";

export const CollectionDetailPage = () => {
  const { id } = useParams();
  const collectionService = new CollectionService();
  const [collectionDetail, setCollectionDetail] = useState<Collection>();

  const getCollectionDetail = (id: string) => {
    collectionService.getCollectionDetail(id).then((res) => {
      if (res?.isSuccess && res?.data?.isSuccess) {
        res?.data?.data && setCollectionDetail(res?.data?.data);
        console.log(res?.data?.data);
      } else {
        //log error
        window.alert(res?.error || res?.data?.message);
      }
    });
  };

  useEffect(() => {
    id && getCollectionDetail(id);

    window.addEventListener("scroll", () => {
      const background = document.getElementById("collection-background");
      const top =
        (window.pageYOffset || document.documentElement.scrollTop) -
        (document.documentElement.clientTop || 0);
      if (top < 300 && background) {
        background.style.opacity = (top / 500).toString();
      }
    });
  }, [id]);

  return (
    <div className="flex flex-col">
      <div className="w-full relative">
        <div
          style={{
            backgroundImage: `url("${collectionDetail?.imageUrl}")`,
          }}
          className="w-screen h-screen sticky top-0 -z-10 bg-fixed"
        >
          <div
            id="collection-background"
            className="w-full h-full bg-black opacity-0"
          />
        </div>

        <div className="h-screen">
          <div className="z-20 w-full px-5 md:px-10 text-2xl md:text-4xl text-center text-white font-semibold">
            {collectionDetail?.name}
          </div>
          <div className="z-20 w-full px-3 md:px-10 text-xl md:text-2xl text-center text-white mt-3">
            {collectionDetail?.description}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 bg-AquaHaze py-10">
        {collectionDetail?.collectionCategories?.map((e, i) => (
          <CollectionCategoryCard index={i + 1} collectioncategory={e} />
        ))}
      </div>
    </div>
  );
};

interface CollectionCategoryCardProps {
  index: number;
  collectioncategory?: CollectionCategory;
}

const CollectionCategoryCard = (props: CollectionCategoryCardProps) => {
  const indexInsert = props.index % 3 === 1 ? 2 : props.index % 3 === 2 ? 5 : 8;
  const productList: Product[] = props?.collectioncategory?.products
    ? [...props?.collectioncategory?.products]
    : [];

  productList?.splice(indexInsert, 0, {
    imageUrl: props?.collectioncategory?.imageUrl,
  });

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 justify-center gap-5 px-[3%]">
      <CollectionCard
        isMainProduct={indexInsert <= 2}
        mainProduct={props?.collectioncategory?.mainProduct}
        productList={productList.filter((_, i) => i <= 2)}
      />
      <CollectionCard
        isReverse
        isMainProduct={indexInsert <= 5 && indexInsert > 2}
        mainProduct={props?.collectioncategory?.mainProduct}
        productList={productList.filter((_, i) => i <= 5 && i > 2)}
      />
      <CollectionCard
        isMainProduct={indexInsert <= 8 && indexInsert > 5}
        mainProduct={props?.collectioncategory?.mainProduct}
        productList={productList.filter((_, i) => i <= 8 && i > 5)}
      />
    </div>
  );
};

interface CollectionCardProps {
  isReverse?: boolean;
  productList?: Product[];
  mainProduct?: Product;
  isMainProduct?: boolean;
}

const CollectionCard = (props?: CollectionCardProps) => {
  const myRef = useRef<HTMLDivElement>(null);
  const [topPosition, setTopPosition] = useState(0);
  const threshold = 200;

  const onScroll = () => {
    if (myRef && myRef.current) {
      const topPos = myRef.current.getBoundingClientRect().top;
      setTopPosition(topPos);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      ref={myRef}
      className={`w-full min-w-[400px] h-[600px] md:h-[1050px] flex ${
        props?.isReverse ? "flex-col-reverse" : "flex-col"
      } relative`}
    >
      <div
        className={`${
          topPosition < threshold ? "h-[68%]" : "h-full"
        } duration-300 w-full absolute ${
          props?.isReverse ? "top-0" : "bottom-0"
        } left-0 rounded-3xl overflow-hidden bg-white cursor-pointer`}
      >
        {props?.isMainProduct ? (
          <div
            style={{
              backgroundImage: `url(${
                props?.productList ? props?.productList[2]?.imageUrl : ""
              })`,
            }}
            className={`${
              topPosition < threshold ? "scale-100" : "scale-125"
            }  bg-cover bg-center duration-500 w-full h-full`}
            onClick={() => {
              props?.mainProduct &&
                globalNavigation(
                  PagePath.ProductDetail + "/" + props?.mainProduct?.id
                );
            }}
          />
        ) : (
          <>
            <div
              className="w-4/5 h-4/5 m-auto"
              onClick={() => {
                props?.productList &&
                  globalNavigation(
                    PagePath.ProductDetail + "/" + props?.productList[2]?.id
                  );
              }}
            >
              <div
                style={{
                  backgroundImage: `url(${
                    props?.productList ? props?.productList[2]?.imageUrl : ""
                  })`,
                }}
                className="w-full h-full bg-cover bg-center bg-no-repeat"
              />
            </div>

            <div className="font-semibold px-3 text-center text-xl">
              {props?.productList ? props?.productList[2]?.name : ""}
            </div>

            <div className="px-3 text-center text-lg">
              {props?.productList ? props?.productList[2]?.price : ""}
            </div>
          </>
        )}
      </div>

      <div
        className={`${
          topPosition < threshold ? "scale-100" : "scale-0"
        } duration-300 w-full flex relative overflow-hidden h-[30%]`}
      >
        <div
          className={`${
            topPosition < threshold ? "w-[45%]" : "w-full"
          } duration-500 h-full bg-white delay-500 absolute top-0 left-0 rounded-[5%] overflow-hidden py-2 cursor-pointer flex-col flex`}
          onClick={() => {
            props?.productList &&
              globalNavigation(
                PagePath.ProductDetail + "/" + props?.productList[1]?.id
              );
          }}
        >
          <div className="w-4/5 flex-1 m-auto">
            <div
              style={{
                backgroundImage: `url(${
                  props?.productList ? props?.productList[1]?.imageUrl : ""
                })`,
              }}
              className="w-full h-full bg-contain bg-no-repeat bg-center"
            />
          </div>

          <div className="font-semibold px-3 text-center">
            {props?.productList ? props?.productList[1]?.name : ""}
          </div>

          <div className="text-sm px-3 text-center">
            {props?.productList ? props?.productList[1]?.price : ""}
          </div>
        </div>

        <div
          className={`${
            topPosition < threshold ? "left-[50%]" : "left-[100%]"
          } duration-500 h-full bg-white delay-500 top-0 w-1/2 absolute rounded-[5%] overflow-hidden flex flex-col py-2 cursor-pointer`}
          onClick={() => {
            props?.productList &&
              globalNavigation(
                PagePath.ProductDetail + "/" + props?.productList[0]?.id
              );
          }}
        >
          <div className="w-4/5 h-4/5 m-auto">
            <div
              style={{
                backgroundImage: `url(${
                  props?.productList ? props?.productList[0]?.imageUrl : ""
                })`,
              }}
              className="w-full h-full bg-contain bg-no-repeat bg-center"
            />
          </div>

          <div className="font-semibold px-3 text-center">
            {props?.productList ? props?.productList[0]?.name : ""}
          </div>

          <div className="text-sm px-3 text-center">
            {props?.productList ? props?.productList[0]?.price : ""}
          </div>
        </div>
      </div>
    </div>
  );
};
