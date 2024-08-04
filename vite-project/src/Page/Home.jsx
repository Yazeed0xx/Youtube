import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Sidebar from "./Sidebar";
import VideoData from "./VideoData";

function Home() {
  const user = localStorage.setItem("user", JSON.stringify(user));

  return (
    <>
      <div className="dark:bg-black">
        <div className="flex-col">
          <Nav />
        </div>
        <div className="flex  mt-1">
          <div className="flex">
            <Sidebar />
          </div>
          <div className="flex mt-10 ml-4">
            <VideoData />
          </div>
        </div>
        <div className=""></div>
      </div>
    </>
  );
}

export default Home;
