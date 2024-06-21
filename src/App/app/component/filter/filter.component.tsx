import { Popover } from "antd";
import { FaAngleDown } from "react-icons/fa6";
import { Checkbox } from "../checkbox/checkbox.component";

export const Filter = () => {
  return (
    <div id="filter" className="w-full font-semibold">
      <div className="w-full flex justify-between">
        <div className="flex gap-3">
          <Popover
            overlayInnerStyle={{
              borderRadius: "2px",
              boxShadow:
                "0 2px 2px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgb(255 255 255 / 25%)",
            }}
            overlayStyle={{ zIndex: 999 }}
            content={<CategoryContent />}
            trigger={"click"}
            placement={"bottomLeft"}
          >
            <div className="flex gap-1 justify-center items-center">
              CATEGORY
              <FaAngleDown className="text-sm" />
            </div>
          </Popover>

          <div className="w-[1px] bg-black" />

          <Popover
            overlayInnerStyle={{
              borderRadius: "2px",
              boxShadow:
                "0 2px 2px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgb(255 255 255 / 25%)",
            }}
            overlayStyle={{ zIndex: 999 }}
            content={<ColorContent />}
            trigger={"click"}
            placement={"bottomLeft"}
          >
            <div className="flex gap-1 justify-center items-center">
              COLOR
              <FaAngleDown className="text-sm" />
            </div>
          </Popover>
        </div>

        <Popover
          overlayInnerStyle={{
            borderRadius: "2px",
            boxShadow:
              "0 2px 2px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgb(255 255 255 / 25%)",
          }}
          overlayStyle={{ zIndex: 999 }}
          content={<ColorContent />}
          trigger={"click"}
          placement={"bottomLeft"}
        >
          <div className="flex gap-1 justify-center items-center">
            SORT BY
            <FaAngleDown className="text-sm" />
          </div>
        </Popover>
      </div>
    </div>
  );
};

const CategoryContent = () => {
  return (
    <div className="px-2 min-w-[200px] flex gap-5">
      {/* Parent Category */}
      <div className="flex flex-col gap-3">
        <Checkbox title="Nước hoa" isCheck />
        <Checkbox title="Nước hoa" />
      </div>

      <div className="w-[1px] bg-black" />

      {/* Child Category */}
      <div className="flex flex-col gap-3">
        <Checkbox title="Nước hoa" isCheck />
        <Checkbox title="Nước hoa" />
      </div>
    </div>
  );
};

const ColorContent = () => {
  return (
    <div className="px-2 min-w-[200px] flex gap-5">
      {/* Parent Category */}
      <div className="flex flex-col gap-3">
        <Checkbox title="Nước hoa" isCheck />
        <Checkbox title="Nước hoa" />
      </div>
    </div>
  );
};
