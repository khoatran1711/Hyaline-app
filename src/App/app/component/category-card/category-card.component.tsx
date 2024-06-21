import { globalNavigation } from "../../../asset/navigation/navigation";
import { PagePath } from "../../../constants/page-path.constant";
import { Category } from "../../models/category.model";
import { Button } from "../button/button.component";

interface CategoryCardProps {
  category?: Category;
}

export const CategoryCard = (props?: CategoryCardProps) => {
  return (
    <div className="w-[230px] h-[300px] p-3 flex flex-col bg-gradient-to-l from-[#FEE5D7] to-[#DDE3E3]">
      <div
        style={{
          backgroundImage: `url(${props?.category?.imageUrl})`,
        }}
        className="w-full h-2/3 bg-contain bg-no-repeat bg-center"
      ></div>

      <div className="my-3 text-center line-clamp-2 cursor-pointer">
        {props?.category?.name}
      </div>
      <div className="w-40 self-center">
        <Button
          className="text-sm"
          title="Khám phá ngay"
          onClick={() =>
            globalNavigation(PagePath.Category + "/" + props?.category?.id)
          }
        />
      </div>
    </div>
  );
};
