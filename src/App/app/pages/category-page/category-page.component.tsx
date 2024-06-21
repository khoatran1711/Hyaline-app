import { useParams } from "react-router-dom";

import { Filter } from "../../component/filter/filter.component";
import { GetAllProductFilter, Product } from "../../models/product.model";
import { useEffect, useState } from "react";
import { ProductService } from "../../services/product.service";
import { ProductCard } from "../../component/product-card/product-card.component";
import { CategoryService } from "../../services/category.service";
import { Category } from "../../models/category.model";
import { Background } from "../../../asset/background/background";

export const CategoryPage = () => {
  const { id } = useParams();
  const [productList, setProductList] = useState<Product[]>();
  const [category, setCategory] = useState<Category>();
  const [request, setRequest] = useState<GetAllProductFilter>({
    categoryIds: [id || ""],
  });
  const productService = new ProductService();
  const categoryService = new CategoryService();

  const getProductList = (requestFilter?: GetAllProductFilter) => {
    productService.getAllProduct(requestFilter).then((res) => {
      if (res?.isSuccess && res?.data?.isSuccess) {
        res?.data?.data && setProductList(res?.data?.data);
      } else {
        //log error
        window.alert(res?.error || res?.data?.message);
      }
    });
  };

  const getCategoryDetail = () => {
    categoryService.getCategoryDetail(id).then((res) => {
      if (res?.isSuccess && res?.data?.isSuccess) {
        res?.data?.data && setCategory(res?.data?.data);

        let parentCategory = res?.data?.data?.parent;
        let parentIds = [id || ""];

        while (parentCategory != null) {
          parentIds = [...parentIds, parentCategory.id];
          parentCategory = parentCategory?.parent;
        }

        setRequest({ ...request, categoryIds: parentIds });

        getProductList(request);
      } else {
        //log error
        window.alert(res?.error || res?.data?.message);
      }
    });
  };

  useEffect(() => {
    id && getCategoryDetail();
  }, [id]);

  return (
    <div id="categorypage">
      <div
        style={{
          backgroundImage: `url(${Background.CategoryDetailPage.CategoryDetailPageBackground})`,
        }}
        className="w-full h-[500px] bg-slate-400 bg-cover bg-center relative bg-fixed flex justify-center items-center"
      >
        <div
          style={{
            boxShadow: "inset 0 0 0 1px white",
          }}
          className="max-w-[80%] text-white py-3 font-semibold bg-[#00000035] backdrop-blur-sm px-8 w-fit h-fit mb-4 md:mb-10 text-2xl md:text-4xl mt-20"
        >
          {category?.name}
        </div>
      </div>

      <div className="w-full px-[5%] py-5 md:py-10">
        <div className="md:py-10 py-5">
          <Filter />
        </div>

        <div className="w-full  grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 justify-center my-5 md:my-10">
          {productList?.map((e) => (
            <ProductCard product={e} />
          ))}
        </div>
      </div>
    </div>
  );
};
