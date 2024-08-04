import React from "react";
import { Link } from "react-router-dom";
import { AiFillYoutube } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { useState, useEffect } from "react";

function Nav() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUsername(user.username);
    }
  }, []);
  return (
    <nav className="bg-gray-950 sticky top-0    p-4 text-white flex justify-between items-center">
      <Link to="/home" className="text-2xl text-red-600 font-bold flex gap-3">
        <AiFillYoutube className=" size-12" />{" "}
        <p className="text-white mt-1">Youtube</p>
      </Link>
      <div className="flex items-center space-x-2 w-full max-w-xl">
        <input
          className="flex-grow p-2 border border-gray-300 rounded-l-full focus:outline-none"
          type="search"
          placeholder="Search"
        />
        <button className=" p-2 rounded-r-full border border-gray-300">
          <CiSearch className="text-xl" />
        </button>
      </div>
      {username ? (
        <div>
          <span> {username}</span>
          <Link to="/login" className="ml-4">
            Logout
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/login" className="ml-4">
            Login
          </Link>
          <Link to="/sign" className="ml-4">
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Nav;
