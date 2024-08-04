import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Avi from "../assets/avi.png";
import axios from "axios";

function Video() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularVideos = async () => {
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
        setVideos(response.data.items);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchPopularVideos();
  }, []);

  return (
    <div className="text-white mt-6  flex flex-wrap justify-evenly">
      {videos.map((video) => (
        <Link
          key={video.id}
          to={`/inside/${video.id}`}
          className="block rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 mb-4"
        >
          <div className="relative aspect-w-16 aspect-h-9">
            <img
              src={video.snippet.thumbnails.medium.url}
              alt="thumbnails"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <div className="flex items-center mb-2">
              <img
                src={Avi}
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="ml-3  w-72">
                <p className="text-sm font-semibold line-clamp-2">
                  {video.snippet.title}
                </p>
                <p className="text-xs text-white mt-1">
                  {video.snippet.channelTitle}
                </p>
                <div className="">
                  {" "}
                  <p className="text-xs  text-white mt-1">
                    views {video.statistics.viewCount}
                    <p className="text.xs text-white">
                      {new Date(video.snippet.publishedAt).toLocaleDateString()}
                    </p>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Video;
