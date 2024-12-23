"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Initially set to null
  const router = useRouter();

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loginStatus === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    alert("You have been logged out.");
    router.push("/"); // Redirect to home page
  };

  if (isLoggedIn === null) {
    // Optional loading indicator or prevent premature redirection
    return <div>Loading...</div>;
  }

  return (
    <nav className="sticky grid justify-items-center top-0 z-50 w-full bg-[#fefce8] shadow-lg">
      <div className="container px-4 md:px-7 lg:px-12">
        <div className="flex flex-wrap items-center justify-between py-3 gap-6 md:py-4 md:gap-0">
          <input
            type="checkbox"
            name="toggle_nav"
            id="toggle_nav"
            className="peer hidden"
          />
          <div className="w-full px-6 flex justify-between lg:w-max md:px-0 z-30">
            <Link href="/" aria-label="logo" className="flex space-x-2 items-center">
              <span className="text-2xl font-bold text-yellow-900">
                Tailus <span className="text-yellow-700">Feedus</span>
              </span>
            </Link>
            <div className="flex items-center lg:hidden max-h-10">
              <label
                role="button"
                htmlFor="toggle_nav"
                aria-label="hamburger"
                id="hamburger"
                className="relative w-10 h-auto p-2"
              >
                <div
                  id="line"
                  className="m-auto h-0.5 w-6 rounded bg-yellow-900 transition duration-300"
                ></div>
                <div
                  id="line2"
                  className="m-auto mt-2 h-0.5 w-6 rounded bg-yellow-900 transition duration-300"
                ></div>
              </label>
            </div>
          </div>
          <label
            role="button"
            htmlFor="toggle_nav"
            className="hidden peer-checked:block fixed w-full h-full left-0 top-0 z-10 bg-yellow-200 bg-opacity-30 backdrop-blur backdrop-filter"
          ></label>
          <div className="hidden peer-checked:flex w-full flex-col lg:flex lg:flex-row justify-end z-30 items-center gap-y-6 p-6 rounded-xl bg-white lg:gap-y-0 lg:p-0 md:flex-nowrap lg:bg-transparent lg:w-7/12">
            <div className="text-gray-600 lg:pr-4 w-full">
              <ul className="tracking-wide font-medium text-sm flex flex-col gap-y-6 lg:gap-y-0 lg:flex-row w-full">
                <li>
                  <Link href="/" className="block md:px-4 transition hover:text-yellow-700">
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/all-recipes"
                    className="block md:px-4 transition hover:text-yellow-700"
                  >
                    <span>All recipes</span>
                  </Link>
                </li>
                <li>
                  <Link href="/cart" className="block md:px-4 transition hover:text-yellow-700">
                    <span>Cart</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-full min-w-max space-y-4 lg:space-y-0 sm:w-max lg:border-l-2 lg:border-yellow-300">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="w-full py-2 px-3 text-center rounded-full transition-all duration-300 transform bg-gradient-to-r from-red-500 via-red-400 to-red-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-max mx-2"
                >
                  <span className="block text-white font-semibold text-sm">Logout</span>
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    title="Sign up"
                    className="w-full py-2 px-3 text-center rounded-full transition-all duration-300 transform bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 sm:w-max mx-2"
                  >
                    <span className="block text-yellow-800 font-semibold text-sm">
                      <Link
                        href="/signup"
                        className="block md:px-4 transition-all duration-200 hover:text-yellow-700"
                      >
                        Sign Up
                      </Link>
                    </span>
                  </button>
                  <button
                    type="button"
                    title="Login"
                    className="w-full py-2 px-3 text-center rounded-full transition-all duration-300 transform bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 sm:w-max"
                  >
                    <span className="block text-yellow-900 font-semibold text-sm">
                      <Link
                        href="/login"
                        className="block md:px-4 transition-all duration-200 hover:text-yellow-700"
                      >
                        Login
                      </Link>
                    </span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
