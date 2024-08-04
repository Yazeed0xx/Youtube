import { useState } from "react";
import Sidebar from "./Page/Sidebar";
import Login from "./Page/Login.jsx";
import Sign from "./Page/Sign.jsx";

import "./App.css";
import Nav from "./Page/Nav.jsx";
import Home from "./Page/Home.jsx";
import Inside from "./Page/ViedoPlayer.jsx";
import Likedvid from "./Page/Likedvid.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/liked",
    element: <Likedvid />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/inside/:videoId",
    element: <Inside />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign",
    element: <Sign />,
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
