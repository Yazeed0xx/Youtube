import React from "react";

function Undervid() {
  return (
    <>
      <div className="mt-4 ">
        <h1 className="text-2xl font-bold"></h1>

        <div className="mt-8 w-auto  border-gray-700 pt-4">
          <div className="flex   justify-end items-center ">
            <div className="flex gap-1 w-full">
              <div className="flex    h-9 w-9 rounded-full overflow-hidden">
                <img src={Avi} alt="" className="w-full h-full object-cover" />
              </div>{" "}
              <p className="ml-2 mt-1"></p>
              <button
                className="rounded-full ml-3 p-1 bg-white text-black"
                type="button"
              >
                Subscribe
              </button>
            </div>
            <div className="flex badge badge-neutral rounded-full h-12 items-center space-x-4">
              <button className="flex items-center space-x-2">
                <AiOutlineLike className="text-2xl h-10 w-14" />
                <span>Like</span>
              </button>
              <button className="flex items-center space-x-2">
                <AiOutlineDislike className="text-2xl" />
                <span>Dislike</span>
              </button>
              <button className="flex  items-center space-x-2">
                <BiSolidShare className="text-2xl " />
                <span className="">Share</span>
              </button>
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <div className="flex-col  space-x-1 mt-3 bg-slate-400 rounded-lg h-auto w-auto">
        <div className="flex ml-2 space-x-1">
          {" "}
          <p className="text-sm "></p>
          <p className="text-white text-sm"></p>
        </div>

        <div className=""></div>
      </div>{" "}
    </>
  );
}

export default Undervid;
