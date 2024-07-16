import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { changeEmail, resetSuccess } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
export default function Email() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth);
  const [data, setData] = useState({
    password: "",
    email: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      changeEmail({
        oldEmail: userData.userData.user.email,
        email: data.email,
        password: data.password,
      })
    );
  };

  useEffect(() => {
    setTimeout(() => {
      if (userData.Success !== null) {
        dispatch(resetSuccess());
      }
    }, [3000]);
  }, [dispatch, userData.Success]);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <p className="text-blue-600 font-bold text-2xl cursor-pointer mt-4 text-center">
          Docket
        </p>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-600">
          Change Account Password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          onSubmit={submitHandler}
          className="space-y-6"
          action="#"
          method="POST"
        >
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Verify Your Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={data.password}
                onChange={changeHandler}
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none focus-within:outline-none sm:text-sm sm:leading-6 px-4"
              />
            </div>
            <label
              htmlFor="password"
              className="mt-2 block text-sm font-medium leading-6 text-gray-900"
            >
              Enter New Email
            </label>
            <div className="mt-2">
              <input
                id="Email"
                name="email"
                type="text"
                value={data.email}
                onChange={changeHandler}
                autoComplete="current-email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none focus-within:outline-none sm:text-sm sm:leading-6 px-4"
              />
            </div>
          </div>
          {userData.error && (
            <p className="mt-2 text-center font-bold text-red-600  rounded-md shadow-lg py-2">
              {userData.error.message || userData.error.error}
            </p>
          )}
          {userData.Success && (
            <p className="mt-2 text-center font-bold text-blue-600  rounded-md shadow-lg py-2">
              {userData.Success.message}
            </p>
          )}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {userData.loading === true ? "Please Wait.." : "Change Email"}
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                navigate("/");
              }}
              className="flex w-full justify-center rounded-md border-2 border-blue-700 bg-gray-50-600 px-3 py-1.5 text-sm font-semibold leading-6 text-blue-700 shadow-sm hover:text-white hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Back to Homepage
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
