import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom"
import RightMenu from "./RightMenu";
import SearchBar from "./SearchBar";

const NavBar = ({ location }) => {
  const [DrawerOpen, setDrawerOpen] = useState(false);

  const onClickDrawerToggle = () => {
    setDrawerOpen(!DrawerOpen);
  };

  const switchBGColor = (path) => {
    const highlighted = 'text-black hover:bg-gray-300 bg-gray-200 ';
    const notHighlighted = 'text-black hover:bg-gray-300';
    const parsedPaths = location.pathname.split('/');

    if (parsedPaths[1] === path) {
      return highlighted;
    } else {
      return notHighlighted;
    }
  }

  return (
    <div className="fixed z-50 w-full bg-white shadow-sm h-12">
      <div className="mx-auto px-2 pr-4 sm:px-6 sm:pr-8">
        <div className="relative flex items-center justify-between h-12 space-x-4">
          <div className="flex space-x-2">
            <div className="inset-y-0 left-0 flex items-center lg:hidden">
              {/* Mobile menu button */}
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
                      DrawerOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>
            <div className="flex w-max items-center justify-center">
              <Link
                to="/"
              >
                <div className="flex items-center space-x-2">
                  <img
                    className="block w-8 h-8 rounded-full"
                    src="/images/icon.png"
                    alt="Videoshare"
                  ></img>
                  <p className="hidden sm:block text-xl text-black tracking-tight">
                    Videoshare
                  </p>
                </div>
              </Link>
              <div className="hidden lg:block lg:ml-6">
                <div className="flex space-x-4">
                  <Link
                    to="/"
                    className={`${switchBGColor('')} px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    Home
                  </Link>
                  <Link
                    to="/subscription"
                    className={`${switchBGColor('subscription')} px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    Subscription
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <SearchBar />
          <RightMenu />
        </div>
      </div>

      <div className={`${DrawerOpen ? "block" : "hidden"}  bg-white lg:hidden shadow-sm`}>
        <div className="px-2 pt-2 pb-3 space-y-1 font-medium">
          {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white"  */}
          <Link
            to="/"
            className={`${switchBGColor('')} block px-3 py-2 rounded-md text-base`}
          >
            Home
          </Link>
          <Link
            to="/subscription"
            className={`${switchBGColor('subscription')} block px-3 py-2 rounded-md text-base`}
          >
            Subscription
          </Link>
        </div>
      </div>
    </div>
  );
}

export default withRouter(NavBar);