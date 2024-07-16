import React, { useEffect, useState } from "react";
import { LuLogOut } from "react-icons/lu";
import { changeEmail, changePassword, logout } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import { VscAccount } from "react-icons/vsc";
import { MdEmail } from "react-icons/md";
import { PiPasswordFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [menu, showMenu] = useState(false);
  const [hover, setHover] = useState(false);

  const logoutUser = async () => {
    await dispatch(logout());
  };

  useEffect(() => {
    if (menu) {
      setIsVisible(true);
    } else {
      // Match the duration of the animation
      const timer = setTimeout(() => setIsVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [menu]);

  return (
    <div className="relative flex sm:mr-12 mr-4 align-middle w-full justify-end ">
      <i
        onClick={() => showMenu(!menu)}
        style={{
          fontSize: "24px",
        }}
      >
        <VscAccount
          className={`cursor-pointer text-gray-400 hover:text-gray-800 ${
            menu === true ? "text-gray-900" : ""
          }`}
        />
      </i>
      {isVisible && (
        <div
          className={`bg-white shadow-2xl rounded-lg absolute z-10 p-4 flex flex-col gap-1 top-10 ${
            menu === true ? "animate-slide-top" : "animate-bounce-out-bck"
          }`}
        >
          <div
            onClick={logoutUser}
            onMouseEnter={() => setHover("logout")}
            onMouseLeave={() => setHover(null)}
            onTouchMove={() => setHover(!true)}
            className={`flex items-center justify-start gap-4 w-full cursor-pointer p-2 rounded ${
              hover === "logout" ? "bg-slate-100" : ""
            }`}
          >
            <i
              style={{
                fontSize: "22px",
              }}
            >
              <LuLogOut />
            </i>
            <p className=" sm:text-[14px]">Logout</p>
          </div>
          <div
            onClick={() => {
              navigate("/UpdateEmail");
            }}
            onMouseEnter={() => setHover("email")}
            onMouseLeave={() => setHover(null)}
            onTouchMove={() => setHover(!true)}
            className={`flex items-center justify-start gap-4 w-full cursor-pointer p-2 rounded ${
              hover === "email" ? "bg-slate-100" : ""
            }`}
          >
            <i
              style={{
                fontSize: "22px",
              }}
            >
              <MdEmail />
            </i>
            <p className="sm:text-[14px]">Change Email</p>
          </div>
          <div
            onClick={() => {
              navigate("/UpdatePassword");
            }}
            onMouseEnter={() => setHover("password")}
            onMouseLeave={() => setHover(false)}
            onTouchMove={() => setHover(!true)}
            className={`flex items-center justify-start gap-4 w-full cursor-pointer p-2 rounded ${
              hover === "password" ? "bg-slate-100" : ""
            }`}
          >
            <i
              style={{
                fontSize: "22px",
              }}
            >
              <PiPasswordFill />
            </i>
            <p className="sm:text-[14px]">Change Password</p>
          </div>
        </div>
      )}
    </div>
  );
}
