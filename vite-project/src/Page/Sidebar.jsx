import React from "react";
import { FaYoutube } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { SiShortcut } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { AiTwotoneLike } from "react-icons/ai";
import { Link } from "react-router-dom";
function Sidebar() {
  return (
    <div className=" w-48  sticky left-0 text-white max-sm:hidden    h-full shadow-md">
      <div className="flex   items-center p-3 hover:bg-black cursor-pointer">
        <IoMdHome className="text-2xl " />
        <span className="ml-4 text-lg ">Home</span>
      </div>
      <div className="flex items-center p-3 hover:bg-black cursor-pointer">
        <SiShortcut className="text-xl " />
        <span className="ml-4 text-lg ">Shorts</span>
      </div>
      <div className="flex items-center p-3 hover:bg-black cursor-pointer">
        <MdOutlineSubscriptions className="text-2xl " />
        <span className="ml-4 text-lg ">Subscriptions</span>
      </div>
      <Link to="/liked">
        <div className="flex items-center p-3 hover:bg-black cursor-pointer">
          <AiTwotoneLike className="text-2xl" />
          <span className="ml-4 text-lg ">Liked Veidos</span>
        </div>
      </Link>
    </div>
  );
}

export default Sidebar;
