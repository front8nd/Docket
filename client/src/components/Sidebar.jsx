import React, { useState, useEffect } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { NotesData } from "../redux/NotesSlice";

export default function Sidebar() {
  const [showOPT, setShowOPT] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (showOPT) {
      setIsVisible(true);
    } else {
      // Match the duration of the animation
      const timer = setTimeout(() => setIsVisible(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [showOPT]);

  // Colors Options

  const colors = [
    "bg-[#2AFC98]",
    "bg-[#7D5BA6]",
    "bg-[#3DA5D9]",
    "bg-[#CB429F]",
    "bg-[#F45B69]",
    "bg-[#F24C00]",
    "bg-[#7AFDD6]",
    "bg-[#D1AC00]",
  ];

  //Sending data to Redux

  const clickHandler = (e) => {
    dispatch(NotesData({ color: e }));
    setShowOPT(false);
  };

  return (
    <div className="py-6 px-2 sm:p-6 absolute left-0 top-0 bottom-0 z-50 bg-white h-screen border-r-[1px] border-gray-100">
      <div className="text-black font-bold cursor-pointer mt-1">Docket</div>
      <div
        className="mt-16"
        onClick={() => {
          setShowOPT(!showOPT);
        }}
      >
        <i
          className={`text-4xl flex justify-center hover:text-gray-800 cursor-pointer ${
            showOPT ? "animate-rotate-in" : "animate-rotate-out"
          }`}
        >
          <BsPlusCircleFill />
        </i>
      </div>
      {isVisible && (
        <div
          className={`flex flex-col items-center mt-8 gap-4 ${
            showOPT ? "animate-bounce-in-bck" : "animate-bounce-out-bck"
          }`}
        >
          {colors.map((e, index) => (
            <span
              key={index}
              onClick={() => {
                clickHandler(e);
              }}
              className={`p-3 cursor-pointer rounded-full ${e}`}
            ></span>
          ))}
        </div>
      )}
    </div>
  );
}
