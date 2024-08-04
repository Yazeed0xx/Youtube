import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Sidebar from "./Sidebar";

function Likedvid() {
  const [username, setUsername] = useState("");

  localStorage.removeItem("userRead");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUsername(user.username);
    }
  }, []);
  const [likedVideos, setLikedVideos] = useState([]);

  useEffect(() => {
    const likedVideos = JSON.parse(localStorage.getItem("likedVideos")) || [];
    setLikedVideos(likedVideos);
  }, []);

  const removeLike = (videoId) => {
    let likedVideos = JSON.parse(localStorage.getItem("likedVideos")) || [];
    likedVideos = likedVideos.filter((video) => video.id !== videoId);
    localStorage.setItem("likedVideos", JSON.stringify(likedVideos));
    setLikedVideos(likedVideos);
  };

  return (
    <>
      <Nav />
      {/* <h1 className="text-2xl font-bold">Your favorite Vedio Here</h1> */}

      <div className="flex flex-wrap gap-1 justify-   bg-gray-950 h-screen">
        {likedVideos.length === 0 ? (
          <p></p>
        ) : (
          likedVideos.map((video) => (
            <div key={video.id} className="mt-10">
              <img src={video.thumbnails} alt="" srcset="" />
              <h2 className="text-base font-bold">{video.title}</h2>
              <p>Channel: {video.channelTitle}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Likedvid;
