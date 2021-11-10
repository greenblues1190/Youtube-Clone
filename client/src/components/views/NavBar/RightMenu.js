import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Axios from "axios";
import { USER_SERVER } from "../../Config";
import Avatar from '../Commons/Avatar';


function RightMenu(props) {
  const user = useSelector(state => state.user);

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleLogout = () => {
    setProfileDropdownOpen(false);
    Axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        window.localStorage.removeItem("userId");
        props.history.push("/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };

  const handleClickAvatar = (event) => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const handleBlurAvatar = (event) => {
    if (profileDropdownOpen) {
      setProfileDropdownOpen(false);
    }
  };

  const handleClickProfile = (event) => {
    props.history.push(`/profile/${localStorage.getItem('userId')}`);
  }

  if (user.userData && user.userData.isAuth) {
    return (
      <div className="inset-y-0 right-0 flex items-center sm:inset-auto sm:ml-6">
        <Link
          to="/video/upload"
          className="relative p-1 rounded-full text-gray-500 hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
        >
          <span className="sr-only">Upload Video</span>
          {/* Heroicon name: plus  */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
        </Link>
        <button className="ml-3 relative p-1 rounded-full text-gray-500 hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
          <span className="sr-only">View notifications</span>
          {/* Heroicon name: bell  */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
        </button>

        {/* Profile dropdown */}
        <div className="ml-5 w-max relative">
          <div>
            <button
              className={`bg-gray-800 flex text-sm rounded-full focus:outline-none ${profileDropdownOpen ? "focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" : ""}`}
              id="user-menu"
              aria-haspopup="true"
              onClick={handleClickAvatar}
              onBlur={handleBlurAvatar}
            >
              <span className="sr-only">Open user menu</span>
              <Avatar imagePath={user.userData.image} size="m" />
            </button>
          </div>
          <div
            className={`transition ${profileDropdownOpen
              ? "ease-out duration-100 transform scale-100 visible"
              : "transition ease-in duration-75 transform scale-95 invisible"
              } origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            <button
              onMouseDown={handleClickProfile}
              className="block w-full px-4 py-2 text-sm text-gray-700 text-justify hover:bg-gray-100"
              role="menuitem"
            >
              Your Profile
            </button>
            <button
              onMouseDown={handleLogout}
              className="block w-full px-4 py-2 text-sm text-gray-700 text-justify hover:bg-gray-100"
              role="menuitem"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="static inset-y-0 right-0 flex items-center pr-2 sm:inset-auto sm:ml-6 sm:pr-0 tracking-wider">
        <Link to="/login">Signin</Link>
        <Link className="ml-6" to="/register">
          Signup
        </Link>
      </div>
    );
  }
}

export default withRouter(RightMenu);