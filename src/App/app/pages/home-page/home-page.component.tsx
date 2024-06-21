import { useEffect, useState } from "react";
import { Background } from "../../../asset/background/background";
import { CategoryCard } from "../../component/category-card/category-card.component";
import { ProductCard } from "../../component/product-card/product-card.component";
import { CategoryService } from "../../services/category.service";
import { ProductService } from "../../services/product.service";
import { Product } from "../../models/product.model";
import { CollectionService } from "../../services/collection.service";
import { Collection } from "../../models/collection.model";
import { CollectionBanner } from "../../component/collection-banner/collection-banner.component";
import { Category } from "../../models/category.model";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.scss";

export const HomePage = () => {
  const categoryService = new CategoryService();
  const productService = new ProductService();
  const collectionService = new CollectionService();

  const [productList, setProductList] = useState<Product[]>();
  const [collectionList, setCollectionList] = useState<Collection[]>();
  const [catrgoryList, setCategoryList] = useState<Category[]>();

  const getCategoryList = () => {
    categoryService.getParentCategory().then((res) => {
      if (res?.isSuccess && res?.data?.isSuccess) {
        res?.data?.data && setCategoryList(res?.data?.data);
      } else {
        //log error
        window.alert(res?.error || res?.data?.message);
      }
    });
  };

  const getProductList = () => {
    productService.getAllProduct({}).then((res) => {
      if (res?.isSuccess && res?.data?.isSuccess) {
        res?.data?.data && setProductList(res?.data?.data);
      } else {
        //log error
        window.alert(res?.error || res?.data?.message);
      }
    });
  };

  const getCollectionList = () => {
    collectionService.getAllCollection().then((res) => {
      if (res?.isSuccess && res?.data?.isSuccess) {
        res?.data?.data && setCollectionList(res?.data?.data);
      } else {
        //log error
        window.alert(res?.error || res?.data?.message);
      }
    });
  };

  useEffect(() => {
    getCategoryList();
    getCollectionList();
    getProductList();
  }, []);

  return (
    <div id="homepage">
      <div
        style={{
          backgroundImage: `url(${Background.HomePage.HomePageBackground})`,
        }}
        className="w-full h-[600px] bg-slate-400 bg-cover bg-top relative bg-fixed"
      >
        <div className="font-intrepid text-xl tracking-widest italic absolute top-[28%] md:top-[34%] left-[30%] md:left-[50%] text-white">
          be unique, be you
        </div>
      </div>

      <div className="w-[90%] justify-evenly m-auto my-5 md:my-10">
        <Slider infinite slidesToShow={4} slidesToScroll={1} arrows centerMode>
          {catrgoryList?.map((e) => (
            <div
              key={e?.id}
              className="flex flex-col justify-center items-center"
            >
              <CategoryCard category={e} />
            </div>
          ))}
        </Slider>
      </div>

      <div className="w-[90%] m-auto my-5 md:my-10 flex flex-col gap-10">
        {collectionList?.map((e) => (
          <CollectionBanner key={e?.id} collection={e} />
        ))}
      </div>

      <div className="w-full px-[5%] grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 justify-center my-5 md:my-10">
        {productList?.map((e) => (
          <ProductCard key={e?.id} product={e} />
        ))}
      </div>
    </div>
  );
};
