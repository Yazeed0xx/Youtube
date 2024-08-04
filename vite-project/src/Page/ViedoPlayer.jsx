import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import InsideRightvid from "./InsideRightvid";
import Avi from "../assets/avi.png";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";
import { BiSolidShare } from "react-icons/bi";
import Nav from "./Nav";

function Inside() {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [videoDetails, setVideoDetails] = useState({
    title: "",
    channelTitle: "",
    views: 0,
    likes: 0,
    dislikes: 0,
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [first, setfirst] = useState("");

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos`,
          {
            params: {
              part: "snippet,statistics",
              id: videoId,
              key: "AIzaSyDguxzYdNvvjiG9aHKD5ajgzDTzz40Xdrc",
            },
          }
        );

        const videoItem = response.data.items.find(
          (item) => item.id === videoId
        );

        if (videoItem) {
          setVideoDetails({
            title: videoItem.snippet.title,
            channelTitle: videoItem.snippet.channelTitle,
            views: videoItem.statistics.viewCount,
            likes: videoItem.statistics.likeCount,
            dislikes: videoItem.statistics.dislikeCount,
            description: videoItem.snippet.description,
            thumbnails: videoItem.snippet.thumbnails.medium.url,
          });
          setLoading(false);
          setError(null);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://665736d49f970b3b36c8673a.mockapi.io/user"
        );
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(
          "https://665736d49f970b3b36c8673a.mockapi.io/data"
        );
        setComments(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVideoDetails();
    fetchUsers();
    fetchComments();
  }, [videoId]);

  const toggleLike = () => {
    setLiked(!liked);
    if (disliked) {
      setDisliked(false);
    }

    let likedVideos = JSON.parse(localStorage.getItem("likedVideos")) || [];

    if (!liked) {
      likedVideos.push(videoDetails);
      setLiked(true);
    } else {
      likedVideos = likedVideos.filter((video) => video.id !== videoId);
      setLiked(false);
    }

    localStorage.setItem("likedVideos", JSON.stringify(likedVideos));
  };

  const toggleDislike = () => {
    setDisliked(!disliked);
    if (liked) {
      setLiked(false);
    }
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = async () => {
    if (!newComment) return;

    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    if (!loggedInUser) {
      setfirst("Please log in to comment.");
      return;
    }

    const commentData = {
      videoId,
      userId: loggedInUser.id,
      username: loggedInUser.username,
      comment: newComment,
      timestamp: new Date().toISOString(),
    };

    try {
      await axios.post(
        "https://665736d49f970b3b36c8673a.mockapi.io/data",
        commentData
      );
      setComments([...comments, commentData]);
      setNewComment("");
    } catch (error) {
      console.error(error);
    }
  };

  const { title, channelTitle, views, description } = videoDetails;

  return (
    <>
      <Nav />
      <div className="flex bg-gray-950 text-white">
        <div className="container mx-auto p-4">
          <div className="video-player relative">
            <iframe
              width="100%"
              height="500"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="Embedded YouTube Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="mt-4">
            <h1 className="text-2xl font-bold">{title}</h1>
            <div className="mt-8 w-auto border-gray-700 pt-4">
              <div className="flex justify-end items-center">
                <div className="flex gap-1 w-full">
                  <div className="flex h-9 w-9 rounded-full overflow-hidden">
                    <img
                      src={Avi}
                      alt="Channel Avatar"
                      className="w-max h-max object-cover"
                    />
                  </div>
                  <p className="ml-2 mt-1">{channelTitle}</p>
                  <button
                    className="rounded-full ml-3 p-1 bg-white text-black"
                    type="button"
                  >
                    Subscribe
                  </button>
                </div>
                <div className="flex badge badge-neutral rounded-full h-12 items-center space-x-4">
                  <button
                    className="flex items-center space-x-2"
                    onClick={toggleLike}
                  >
                    {liked ? (
                      <AiFillLike className="text-2xl text-blue-500" />
                    ) : (
                      <AiOutlineLike className="text-2xl" />
                    )}
                    <span>Like</span>
                  </button>
                  <button
                    className="flex items-center space-x-2"
                    onClick={toggleDislike}
                  >
                    {disliked ? (
                      <AiFillDislike className="text-2xl text-red-500" />
                    ) : (
                      <AiOutlineDislike className="text-2xl" />
                    )}
                    <span>Dislike</span>
                  </button>
                  <button className="flex items-center space-x-2">
                    <BiSolidShare className="text-2xl" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-col space-x-1 mt-3 bg-slate-800 rounded-lg h-auto w-full">
            <div className="flex ml-2 space-x-1">
              <p className="text-base">Views: {views}</p>
              <p className="text-white text-sm">
                {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className="text-xs w-96 mt-2">{description}</div>
          </div>
          <div className="border-t border-gray-300 pt-4">
            <h2 className="text-xl font-bold mb-4">Comments</h2>
            <div className="flex space-x-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden">
                <img
                  src={Avi}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="text-red-600">{first}</div>

                <textarea
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                  rows="3"
                  value={newComment}
                  onChange={handleCommentChange}
                  placeholder="Comment"
                ></textarea>
                <div className="mt-2 text-right">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    onClick={handleCommentSubmit}
                  >
                    Comment
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-4">
              {comments.map((comment, index) => (
                <div key={index} className="flex space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src={Avi}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold">
                      {comment.username} -{" "}
                      <span className="text-sm">
                        {new Date(comment.timestamp).toLocaleString()}
                      </span>
                    </p>
                    <p>{comment.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <InsideRightvid />
      </div>
    </>
  );
}

export default Inside;
