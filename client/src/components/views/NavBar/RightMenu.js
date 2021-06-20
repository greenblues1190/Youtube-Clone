import React, { useState } from "react";
import axios from "axios";
import { USER_SERVER } from "../../Config";
import { withRouter, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Avatar from '../Commons/Avatar';
import moment from 'moment';

function RightMenu(props) {
  const user = useSelector((state) => state.user);

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const renderthings = () => {
    console.log(`[${moment(Date.now()).format('hh:mm:ss')}] rendered: right menu`);
    return (
      <p>right menu here</p>
    )
  }

  const handleLogout = () => {
    setProfileDropdownOpen(false);
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        window.localStorage.removeItem("userId");
        props.history.push("/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };

  const onLinkClick = () => {
    // alert("beep!");
    setProfileDropdownOpen(false);
  }

  const onClickProfile = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };
  const onBlurProfile = () => {
    if (profileDropdownOpen) {
      setProfileDropdownOpen(false);
    }
  };

  // return (
  //   renderthings()
  // )
  if (user.userData && user.userData.isAuth) {
    renderthings()
    return (
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <Link
          to="/video/upload"
          className="relative bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
        >
          <span className="sr-only">Upload Video</span>
          {/* Heroicon name: bell  */}
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </Link>
        <button className="ml-3 relative bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
          <span className="sr-only">View notifications</span>
          {/* Heroicon name: bell  */}
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>

        {/* Profile dropdown */}
        <div className="ml-5 relative">
          <div>
            <button
              className={`bg-gray-800 flex text-sm rounded-full focus:outline-none ${profileDropdownOpen ? "focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" : ""}`}
              id="user-menu"
              aria-haspopup="true"
              onClick={onClickProfile}
              onBlur={onBlurProfile}
            >
              <span className="sr-only">Open user menu</span>
              <Avatar imagePath={user.userData.image} size="m" />
            </button>
          </div>
          <div
            className={`transition ${profileDropdownOpen
              ? "ease-out duration-100 transform scale-100 visible"
              : "transition ease-in duration-75 transform scale-95 invisible"
              } origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            <Link
              to={`/profile/${user.userData._id}`}
              onMouseDown={onLinkClick}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Your Profile
            </Link>
            <Link
              to="/video/upload"
              onMouseDown={onLinkClick}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Settings
            </Link>
            <Link
              onMouseDown={handleLogout}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Sign out
            </Link>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 tracking-wider">
        <Link to="/login">Signin</Link>
        <Link className="ml-6" to="/register">
          Signup
        </Link>
      </div>
    );
  }
}

export default withRouter(RightMenu);
