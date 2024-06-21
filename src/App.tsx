import React, { LegacyRef, useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="bg-white flex flex-col">
        <div className="w-40 bg-slate-400 h-[500px]" />

        <div className="flex flex-col flex-1 ">
          <TestObject />

          <div className="w-40 bg-slate-400 h-[1000px]" />

          <TestObject />

          <div className="w-40 bg-slate-400 h-[1000px]" />

          <TestObject />

          <div className="w-40 bg-slate-400 h-[1000px]" />
        </div>
      </div>
    </div>
  );
}

export default App;

const ImageUrl =
  "https://images.pexels.com/photos/20411329/pexels-photo-20411329/free-photo-of-a-plate-of-strawberries-and-a-cup-of-coffee.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load";
const ImageUrl2 =
  "https://images.pexels.com/photos/23332857/pexels-photo-23332857/free-photo-of-a-jar-of-yogurt-with-strawberries-and-a-spoon.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load";

const TestObject = () => {
  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      if (myRef && myRef.current) {
        const topPos = myRef.current.getBoundingClientRect().top;
        setTopPosition(topPos);
      }
    });
  }, []);

  const myRef = useRef<HTMLDivElement>(null);
  const [topPosition, setTopPosition] = useState(0);
  const threshold = 150;

  return (
    <div
      ref={myRef}
      className="w-[400px] h-[550px] bg-red-800 flex flex-col-reverse relative"
    >
      <div
        className={`${
          topPosition < threshold ? "h-[68%]" : "h-full"
        } duration-300 w-full bg-slate-300 absolute top-0 left-0 rounded-3xl overflow-hidden`}
      >
        <img
          src={ImageUrl}
          className={`${
            topPosition < threshold ? "w-full h-full" : "w-[120%] h-[120%]"
          }  object-cover object-center duration-500`}
        />
      </div>

      <div
        className={`${
          topPosition < threshold ? "h-[30%]" : "h-0"
        } duration-300 w-full flex relative overflow-hidden`}
      >
        <div
          className={`${
            topPosition < threshold ? "w-[45%]" : "w-full"
          } duration-500 h-full bg-slate-500 delay-500 absolute top-0 left-0 rounded-[5%] overflow-hidden`}
        >
          <img
            src={ImageUrl2}
            className={`${
              topPosition < threshold ? "w-full" : "w-[120%]"
            } h-full object-contain object-center`}
          />
        </div>

        <div
          className={`${
            topPosition < threshold ? "left-[50%]" : "left-[100%]"
          } duration-500 h-full bg-slate-500 delay-500 top-0 w-1/2 absolute rounded-[5%] overflow-hidden`}
        >
          <img
            src={ImageUrl2}
            className="w-full h-full object-contain object-center"
          />
        </div>
      </div>
    </div>
  );
};
