import React, { useState, useEffect } from "react";
import styles from "../styles/Auth.module.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Navbar } from "../components/Navbar";
import { addUserData } from "../slices/UserData";
import { jwtDecode, InvalidTokenError } from "jwt-decode";
import { useDispatch } from "react-redux";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [check, setCheck] = useState("");
  const navigate = useNavigate(); // Get useNavigate hook instance within the component
  const dispatch = useDispatch();

  const submitBtn = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/usersApi/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.detail) {
        setError(data.detail);
      } else {
        window.sessionStorage.setItem("token", data.token);

        // Dispatch the addUserData action with user information
        dispatch(
          addUserData({
            user_id: data.user_id,
            email: data.email,
            sellerType: data.sellerType,
          })
        );

        console.log("Login successful");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  console.log(check);
  return (
    <div className="flex min-h-full flex-col overflow-hidden justify-items-center mx-auto">
      <div className="absolute right-0 py-4 px-12">
        <h1 className="font-semibold text-center text-3xl text-[#539e60]">
          3Dify
        </h1>

        <p className="text-xs ">Secure Login</p>
      </div>
      <div className="flex flex-row justify-between ">
        <div className="w-1/2 flex items-center justify-center h-screen bg-[#539e60] text-center">
          <div className="">
            <div className="text-white">
              <h1 className="text-3xl font-semibold">
                Explore a world of 3D printing possibilities
              </h1>
              <h3 className="text-xl mt-2 font-medium">
                Discover unique 3D models for every project!
              </h3>
            </div>

            <div>
              <img
                className="w-1/3 mx-auto mt-12 rounded-lg"
                src="../../login.png"
                alt=""
              />
            </div>

            <div className="mt-12 text-white">
              <h3>Browse and download 3D models instantly!</h3>
            </div>
          </div>
        </div>
        <div className="w-1/2 -mt-12 flex flex-col items-center justify-center h-screen">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-24">
            <h2 className="mt-10  text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={submitBtn}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    name="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    type="password"
                    id="password"
                    value={password}
                    placeholder="Password"
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3 "
                  />
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-sm mb-2 bg-red-100 py-2 px-3 rounded-lg font-semibold tracking-wide">
                  {error}
                </p>
              )}

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-[#539e60] px-3 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-[#306e3a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
            <p className="text-sm mt-2 text-gray-500">
              Forgot your password ? <a className="text-gray-600 font-semibold hover:text-green-600" href="/forgot-password">Click Here</a>
            </p>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?
              <a
                href="/User_SignUp"
                className="font-semibold leading-6 text-gray-600 hover:text-green-600"
              >
                {" "}
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
