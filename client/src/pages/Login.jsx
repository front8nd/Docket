import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, resetSuccess } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "../Hooks/useSnackbar";
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };
  const showSnackbar = useSnackbar();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(data));
  };

  useEffect(() => {
    if (userData.isAuthenticated === true) {
      showSnackbar("Logged In");
      navigate("/");
    }
  }, [dispatch, userData.isAuthenticated]);

  useEffect(() => {
    if (userData.error)
      setTimeout(() => {
        dispatch(resetSuccess());
      }, [3000]);
  }, [userData.error, dispatch]);
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <p className="text-blue-600 font-bold text-2xl cursor-pointer mt-4 text-center">
          Docket
        </p>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-600">
          Sign in to your account
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
              <div className="text-sm">
                <Link
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>
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
          {userData.error && (
            <p className="mt-2 text-center font-bold text-red-600  rounded-md shadow-lg py-2">
              {userData.error.message || userData.error.error}
            </p>
          )}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {userData.loading === true ? "Please Wait.." : "Sign in"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            to={"/SignUp"}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Sign Up Now
          </Link>
        </p>
      </div>
    </div>
  );
}
