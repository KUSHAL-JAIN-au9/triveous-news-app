"use client";
import { app } from "@/firebase.config";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated, setUser } from "@/redux/users/userSlice";

const LoginPage = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");
  const users = useSelector((state) => state.userReducer.users);
  console.log("state", users);

  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && users?.isAuthenticated) {
      router.push("/News");
    }
  }, [users]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({ email, password });
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const { email, accessToken, uid } = userCredential.user;
        // ...
        dispatch(setUser({ email, accessToken, uid }));
        dispatch(isAuthenticated());
        setemail("");
        setpassword("");
        setError("");
        localStorage.setItem("token", accessToken);
        console.log("Authent", { email, accessToken, uid });
        // router.push("/News", { scroll: false });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorCode);
      });
  };

  return (
    <>
      <h1 className="text-center font-bold text-lg p-2">Login Page </h1>
      <span className="p-2 text-center text-red-600 text-xl">
        {error ? error : ""}
      </span>
      <form
        className="max-w-sm mx-auto  w-full h-80 bg-white rounded-xl p-10"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Sign In
        </button>
      </form>
      <p className="p-2">
        Not Registerd! click here to{" "}
        <Link className="text-sky-600" href={"/Register"}>
          Sign Up
        </Link>
      </p>
    </>
  );
};

export default LoginPage;
