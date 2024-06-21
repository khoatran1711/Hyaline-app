import { NavLink, Outlet, useLocation } from "react-router-dom";
import "./app.style.scss";
import { Fragment, useEffect } from "react";
import { PagePath } from "../constants/page-path.constant";

export const Path = {
  Home: "/home",
  WhyUs: "/why-us",
  Prices: "/prices",
  Contact: "/contact",
};

export const Layout = () => {
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    window.scrollTo(0, 0);

    const background = document.getElementById("background");
    const logo = document.getElementById("logo");
    const hyalineTitle = document.getElementById("hyaline-title");
    const category = document.getElementById("category");
    const title = document.querySelectorAll(".title-header");

    const onScroll = () => {
      const doc = document.documentElement;
      var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

      if (!background) {
        return;
      }

      if (pathname === PagePath.Home) {
        if (top >= 20) {
          hyalineTitle?.classList.add("hyaline-title-small");
          hyalineTitle?.classList.remove("hyaline-title-big");
          background.classList.add("move-in");
          background.classList.remove("move-out");
          logo && logo.classList.remove("white-image");
          category && category.classList.remove("white-image");

          title?.forEach((element) => {
            element.classList.remove("title-white");
            element.classList.add("title-black");
          });
        } else {
          hyalineTitle?.classList.add("hyaline-title-big");
          hyalineTitle?.classList.remove("hyaline-title-small");
          background.classList.add("move-out");
          background.classList.remove("move-in");
          logo && logo.classList.add("white-image");
          category && category.classList.add("white-image");

          title?.forEach((element) => {
            element.classList.remove("title-black");
            element.classList.add("title-white");
          });
        }
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return (
    <div className="font-montserrat overflow-x-clip">
      <div
        id="header"
        className="w-full fixed left-0 top-0 flex items-center justify-center transition-all ease-in h-[64px] md:h-[74px] lg:h-[88px]  border-b-[1px] border-Juniper overflow-hidden z-[1000]"
      >
        <div
          id="background"
          className={`h-full w-full absolute bg-white duration-500 ${
            location?.pathname === PagePath.Home ? "move-out" : "move-in"
          } `}
        ></div>
        <div className="container hidden h-full max-w-screen-xl items-center justify-between py-2 md:flex lg:py-3"></div>
        <div className="md:hidden flex w-full items-center relative justify-between">
          <label htmlFor="test" className="pl-3">
            <div className="w-10 h-10 p-2">
              <img
                src={""}
                id="category"
                alt="category"
                className="w-full h-full object-contain duration-1000"
              />
            </div>
          </label>
        </div>
      </div>
      <div className="flex flex-col md:hidden relative">
        <input type="checkbox" className="hidden peer" id="test" />

        <div className="w-full h-screen absolute bg-white z-50 max-h-0 peer-checked:max-h-screen duration-300 flex flex-col overflow-hidden">
          <div className="flex flex-col mt-3 gap-2 items-center"></div>

          <div className="flex justify-center justify-self-end mx-[10%] mt-5 border-t-[1px] border-Juniper">
            <div
              className="mt-2 text-base cursor-pointer"
              onClick={() => {
                const btn = document.getElementById("test");
                btn?.click();
              }}
            >
              Đóng
            </div>
          </div>
        </div>
      </div>

      <div
        id="hyaline-title"
        className={`${
          pathname === PagePath.Home
            ? "hyaline-title-big"
            : "hyaline-title-small"
        } fixed text-center left-0 right-0 z-[1002] duration-500`}
      >
        HYALINE
      </div>

      <div id="body" className="w-screen">
        <Outlet />
      </div>
    </div>
  );
};
