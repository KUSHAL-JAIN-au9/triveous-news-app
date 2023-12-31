"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "@/firebase.config";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { isAuthenticated, setUser } from "@/redux/users/userSlice";

const page = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");
  const users = useSelector((state) => state.userReducer.users);
  // console.log("state", users);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (users?.isAuthenticated || token) {
      router.push("/News");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({ email, password });

    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        // ...
        setemail("");
        setpassword("");
        setError("");
        const { email, accessToken, uid } = userCredential.user;
        // ...
        dispatch(setUser({ email, accessToken, uid }));
        dispatch(isAuthenticated());
        router.push("/News", { scroll: false });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.table(error);
        setError(errorCode);
        // ..
      });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-14">
      <h1 className="text-center font-bold text-lg p-2">Sign Up Page</h1>
      <span className=" p-2 text-center text-red-600 text-xl">
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
        {/* <div class="flex items-start mb-5">
          <div class="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              required
            />
          </div>
          <label
            for="remember"
            class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Remember me
          </label>
        </div> */}
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Sign Up
        </button>
      </form>
      <p className="p-2">
        already Registerd? click here to{" "}
        <Link className="text-sky-600" href={"/"}>
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default page;
