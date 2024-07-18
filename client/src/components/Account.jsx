import React, { useEffect, useState } from "react";
import { LuLogOut } from "react-icons/lu";
import { deleteUser, logout, resetSuccess } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { VscAccount } from "react-icons/vsc";
import { MdEmail } from "react-icons/md";
import { PiPasswordFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { AiOutlineUserDelete } from "react-icons/ai";
import { useSnackbar } from "../Hooks/useSnackbar";

export default function Account() {
  const userData = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [menu, showMenu] = useState(false);
  const [hover, setHover] = useState(false);

  const logoutUser = async () => {
    showSnackbar("Logging Out, Please wait..");
    await dispatch(logout());
  };

  const deleteAccount = async () => {
    showSnackbar("Deleting Account, Please wait..");
    await dispatch(
      deleteUser({
        userId: userData.userData.user._id,
      })
    );
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

  useEffect(() => {
    if (userData?.Success?.success === true) {
      dispatch(logout());
      dispatch(resetSuccess());
      navigate("/");
    }
  }, [dispatch, userData.Success]);

  const showSnackbar = useSnackbar();

  return (
    <div className="relative flex sm:mr-12 mr-4 align-middle w-full justify-end cursor-pointer">
      <i
        onClick={() => showMenu(!menu)}
        style={{
          fontSize: "24px",
        }}
        className="flex gap-2 text-gray-800 items-center "
      >
        <VscAccount
          className={`cursor-pointer text-gray-400 hover:text-gray-800 ${
            menu === true ? "text-gray-900" : ""
          }`}
        />
        <p className="text-[14px] text-ellipsis overflow-hidden w-20 font-bold whitespace-nowrap">
          {userData.userData.user.name}
        </p>
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
          <div
            onClick={deleteAccount}
            onMouseEnter={() => setHover("delete")}
            onMouseLeave={() => setHover(false)}
            onTouchMove={() => setHover(!true)}
            className={`flex items-center justify-start gap-4 w-full cursor-pointer p-2 rounded ${
              hover === "delete" ? "bg-slate-100" : ""
            }`}
          >
            <i
              style={{
                fontSize: "22px",
              }}
            >
              <AiOutlineUserDelete />
            </i>
            <p className="sm:text-[14px]">
              {userData.loading === true ? "Please Wait..." : "Delete Account"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
