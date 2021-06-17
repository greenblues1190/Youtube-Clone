import React, { useState } from "react";
import { Link } from "react-router-dom"
import RightMenu from "./RightMenu";

function NavBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const onClickDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div className="fixed z-50 w-full bg-white shadow h-12">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-12">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
              onClick={onClickDrawerToggle}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#000"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    drawerOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <img
                className="block lg:hidden h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="Workflow"
              ></img>
              <Link
                className="hidden lg:block h-8 w-auto text-xl text-black tracking-widest"
                to="/"
              >
                website
              </Link>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white"  */}
                <Link
                  to="/"
                  className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/subscription"
                  className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Subscription
                </Link>
              </div>
            </div>
          </div>
          <RightMenu />
        </div>
      </div>

      <div className={`${drawerOpen ? "block" : "hidden"}  bg-white bg-opacity-50 sm:hidden shadow`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white"  */}
          <Link
            to="/"
            className="bg-black text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Dashboard
          </Link>
          <Link
            to="/"
            className="text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Team
          </Link>
          <Link
            to="/"
            className="text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Projects
          </Link>
          <Link
            to="/"
            className="text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Calendar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
