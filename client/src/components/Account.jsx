import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { LuLogOut } from "react-icons/lu";
import { logout } from "../redux/authSlice";
import { useDispatch } from "react-redux";

export default function Account() {
  const dispatch = useDispatch();
  const submitHandler = async () => {
    await dispatch(logout());
  };
  return (
    <div className="relative flex mx-12 gap-2 align-middle w-full justify-end">
      <i
        onClick={submitHandler}
        style={{
          fontSize: "24px",
        }}
      >
        <LuLogOut className="cursor-pointer text-gray-400 hover:text-gray-800" />
      </i>
    </div>
  );
}
