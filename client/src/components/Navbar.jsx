import React from "react";
import Search from "./Search";

export default function Navbar() {
  return (
    <div className="p-6 bg-white border-b-[1px] border-gray-100  text-black ml-[calc(100px)] ">
      <Search />
    </div>
  );
}
