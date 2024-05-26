import React, { useState, useEffect } from "react";
import styles from "../styles/Auth.module.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import { jwtDecode, InvalidTokenError } from "jwt-decode";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [check, setCheck] = useState("");
  const navigate = useNavigate(); // Get useNavigate hook instance within the component

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
        throw new Error(data.detail); // Handle login errors gracefully
      }

      // Successful login
      window.sessionStorage.setItem("token", data.token); // Consider using a state management library for tokens
      console.log("Login successful");

      navigate("/dashboard"); // Redirect to dashboard on success
    } catch (error) {
      console.error("Login failed:", error.message);
      setError(error.message); // Display error message to the user
    }
  };

  console.log(check);
  return (
    <div class="flex min-h-full flex-col justify-centerlg">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm mt-24">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" onSubmit={submitBtn}>
          <div>
            <label
              for="email"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div class="mt-2">
              <input
                type="email"
                placeholder="Email"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                class="block w-full rounded-md border-0 pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label
                name="password"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div class="mt-2">
              <input
                type="password"
                id="password"
                value={password}
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
                autocomplete="current-password"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3 "
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
              class="flex w-full justify-center rounded-md bg-[#539e60] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#306e3a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p class="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <a
            href="/User_SignUp"
            class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};
