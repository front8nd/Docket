import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { searchQuery } from "../redux/NotesSlice";

export default function Search() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  return (
    <div className="relative flex ml-12 gap-2 align-middle ">
      <CiSearch
        size={24}
        className="cursor-pointer text-gray-400 hover:text-gray-800"
      />
      <input
        placeholder="Search"
        className="outline-0 border-0 text-[16px] w-28"
        value={search}
        name="search"
        onChange={(e) => {
          setSearch(e.target.value);
          dispatch(searchQuery(e.target.value));
        }}
      ></input>
    </div>
  );
}
