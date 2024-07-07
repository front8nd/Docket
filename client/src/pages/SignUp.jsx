import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../redux/authSlice";
import { useSelector, useDispatch } from "react-redux";
export default function SignUp() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(register(data));
  };

  useEffect(() => {
    if (userData.registrationSuccess === "success") {
      setData({
        name: "",
        email: "",
        password: "",
      });
    }
    [dispatch, userData.registrationSuccess];
  });
  console.log(userData);
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <p className="text-blue-600 font-bold text-2xl cursor-pointer mt-4 text-center">
          Docket
        </p>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-600">
          Create your new account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <div className="mb-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  value={data.name}
                  onChange={changeHandler}
                  type="text"
                  autoComplete="name"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none focus-within:outline-none sm:text-sm sm:leading-6 px-4"
                />
              </div>
            </div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                value={data.email}
                onChange={changeHandler}
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none focus-within:outline-none sm:text-sm sm:leading-6 px-4"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
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
          </div>
          {userData.registrationSuccess && (
            <p className="mt-2 text-center text-sm text-blue-600">
              Registrated Successfully, You can Login Now
            </p>
          )}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {userData.loading === true ? "Please Wait.." : "Register"}
            </button>
          </div>
          {userData.registrationError && (
            <p className="mt-2 text-center font-bold text-red-600  rounded-md shadow-lg py-2">
              {userData.registrationError.message || userData.registrationError}
            </p>
          )}
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already a member?{" "}
          <Link
            to={"/login"}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Login Now!
          </Link>
        </p>
      </div>
    </div>
  );
}
