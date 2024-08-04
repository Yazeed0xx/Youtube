import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";

function InsideRightvid() {
  const [relatedVideos, setRelatedVideos] = useState([]);

  useEffect(() => {
    const fetchRelatedVideos = async () => {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/youtube/v3/videos",
          {
            params: {
              part: "snippet,statistics",
              regionCode: "SA",
              maxResults: 100000,
              chart: "mostPopular",
              key: "AIzaSyDguxzYdNvvjiG9aHKD5ajgzDTzz40Xdrc",
            },
          }
        );
        setRelatedVideos(response.data.items);
      } catch (error) {
        console.error("Error fetching related videos:", error);
      }
    };

    fetchRelatedVideos();
  }, []);

  return (
    <>
      <div className="px-4 bg-gray-950 w-[45%]">
        <h2 className="text-lg font-semibold mb-4"></h2>
        <div className="flex-col gap-3 space-y-2">
          {relatedVideos.map((video) => (
            <Link to={`../inside/${video.id}`}>
              <div key={video.id} className="flex gap-5 max-w-xs">
                {video.snippet && (
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={video.snippet.thumbnails.medium?.url}
                      alt="Related Video Thumbnail"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity"></div>
                  </div>
                )}
                <div className="mt-2 w-72">
                  {video.snippet.title}
                  <div className="flex items-center mt-1">
                    <AiFillEye className="text-white" />
                    <span className="text-xs text-white ml-1">
                      {video.statistics?.viewCount} views
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default InsideRightvid;
