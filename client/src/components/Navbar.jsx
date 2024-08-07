import React from "react";
import Search from "./Search";
import Account from "./Account";

export default function Navbar() {
  return (
    <div className="py-6  bg-white border-b-[1px] border-gray-100  text-black sm:ml-[80px] ml-[40px] flex space-between">
      <Search />
      <Account />
    </div>
  );
}
