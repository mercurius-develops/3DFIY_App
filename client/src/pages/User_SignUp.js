import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/Auth.module.css";

import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const User_SignUp = () => {
  const [error, setError] = useState(null);

  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const userRef = useRef();
  const errRef = useRef();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [profile_pic, setProfile_pic] = useState(null);
  const [location, setLocation] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [cnic_number, setCnic_number] = useState("");
  const [bio, setBio] = useState("");
  const [cnic_pic, setCnic_pic] = useState("");
  const [sellerType, setSellerType] = useState("Regular");
  const [nextComp, setNextComp] = useState(true);
  console.log(cnic_pic);
  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [username, pwd, matchPwd]);

  // Your existing state variables and useEffect hooks here

  const SubmitBtn = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(username);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/usersApi/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          username,
          email,
          password: pwd,
          location,
          profile_pic,
          phoneNo,
          cnic_number,
          cnic_pic,
          sellerType,
          bio,
        }),
      });
      const data = await response.json();
      if (data.error) {
        setErrMsg(data.error);
      } else {
        setSuccess(true);
        setErrMsg("");
      }
    } catch (error) {
      console.error(error);
      setErrMsg("Server Error");
    }
  };

  const handleProfilePic = (e) => {
    setProfile_pic(e.target.files[0]);
  };

  const handleCnicPic = (e) => {
    setCnic_pic(e.target.files[0]);
  };

  const nextCompBtn = () => {
    setNextComp(!nextComp);
  };
  const nextCompAsDesigner = () => {
    setSellerType("Designer");
    setNextComp(!nextComp);
  };
  const nextCompAsPrinterOwner = () => {
    setSellerType("Printer Owner");
    setNextComp(!nextComp);
  };

  const backCompBtn = () => {
    setNextComp(!nextComp);
  };
  console.log(
    name,
    username,
    email,
    pwd,
    location,
    profile_pic,
    phoneNo,
    cnic_number,
    cnic_pic,
    sellerType,
    bio
  );

  return (
    <div className="flex min-h-full flex-col  justify-items-center mx-auto">
      <div className="absolute right-0 py-4 px-12">
        <h1 className="font-semibold text-center text-3xl text-[#539e60]">
          3Dify
        </h1>

        <p className="text-xs ">Secure Login</p>
      </div>
      <div className="flex flex-row justify-between ">
        <div className="w-1/2 flex items-center justify-center h-screen bg-gray-600 text-center">
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
            <h2 className="mt-4 text-center text-2xl font-bold tracking-tight text-gray-900">
              Sign up to get started
            </h2>
          </div>
          <p
            ref={errRef}
            className={errMsg ? styles.errmsg : styles.offscreen}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {nextComp ? (
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="username"
                      placeholder="Username"
                      ref={userRef}
                      autoComplete="off"
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                      required
                      aria-invalid={validName ? "false" : "true"}
                      aria-describedby="uidnote"
                      onFocus={() => setUserFocus(true)}
                      onBlur={() => setUserFocus(false)}
                      className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="Profile_pic"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Upload Profile Pic
                  </label>
                  <input
                    type="file"
                    id="Profile_pic"
                    placeholder="Upload Profile Pic"
                    onChange={handleProfilePic}
                    className="mt-1 pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Enter Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    placeholder="Enter Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="mt-1 pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phoneNo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Enter Phone Number
                  </label>
                  <input
                    type="number"
                    id="phoneNo"
                    placeholder="Enter Phone Number"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    className="mt-1 pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

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
                      className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      type="password"
                      id="password"
                      onChange={(e) => setPwd(e.target.value)}
                      value={pwd}
                      required
                      aria-invalid={validPwd ? "false" : "true"}
                      aria-describedby="pwdnote"
                      onFocus={() => setPwdFocus(true)}
                      onBlur={() => setPwdFocus(false)}
                      placeholder="Password"
                      className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirm_pwd"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-2">
                    <input
                      type="password"
                      id="confirm_pwd"
                      onChange={(e) => setMatchPwd(e.target.value)}
                      value={matchPwd}
                      required
                      placeholder="Confirm Password"
                      aria-invalid={validMatch ? "false" : "true"}
                      aria-describedby="confirmnote"
                      onFocus={() => setMatchFocus(true)}
                      onBlur={() => setMatchFocus(false)}
                      className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <button
                  onClick={SubmitBtn}
                  className="w-full py-2 mt-6 bg-indigo-600 text-white rounded-md"
                >
                  Submit
                </button>

                <div className="flex justify-between mt-4">
                  <p>Become A Seller</p>
                  <button
                    onClick={nextCompAsPrinterOwner}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    As Printer Owner
                  </button>
                  <button
                    onClick={nextCompAsDesigner}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    As Model Designer
                  </button>
                </div>

                <p className="mt-10 text-center text-sm text-gray-500">
                  Already have an account?{" "}
                  <a
                    href="/Login"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Log In
                  </a>
                </p>
              </form>
            ) : (
              <div>
                <div>
                  <label
                    htmlFor="cnic_number"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Enter CNIC Number
                  </label>
                  <input
                    type="number"
                    name="cnic_number"
                    id="cnic_number"
                    value={cnic_number}
                    onChange={(e) => setCnic_number(e.target.value)}
                    className="mt-1 pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Enter Bio
                  </label>
                  <input
                    type="text"
                    id="bio"
                    name="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="mt-1 pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label
                    htmlFor="cnic_pic"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Upload CNIC
                  </label>
                  <input
                    type="file"
                    id="cnic_pic"
                    name="cnic_pic"
                    onChange={handleCnicPic}
                    className="mt-1 pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="mt-6 flex justify-between">
                  <button
                    onClick={SubmitBtn}
                    className="px-4 py-2 bg-green-500 text-white rounded-md"
                  >
                    Submit
                  </button>
                  <button
                    onClick={backCompBtn}
                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                  >
                    Back
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
