import React from "react";
import { MdOutlineSearch } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSidebar, toggleTheme } from "../../redux/slice/authSlice";
import UserAvatar from "./UserAvatar";
import NotificationPanel from "../NotificationPanel";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const  theme  = useSelector((state) => state.auth.theme)
  // console.log("Theme kya hai" ,theme)
  const dispatch = useDispatch();

  return (
    <div className="flex justify-between items-center bg-gray-900 px-4 py-3 2xl:py-4 sticky top-0 z-50 shadow-md border-l border-gray-300">
  
      <div className="flex items-center gap-4 w-full md:w-auto">
        <button
          onClick={() => dispatch(setOpenSidebar(true))}
          className="text-2xl text-gray-300 block md:hidden hover:text-white transition"
        >
          ☰
        </button>

        <div className="hidden sm:flex w-full md:w-64 lg:w-80 2xl:w-[400px] items-center py-2 px-3 gap-2 rounded-full bg-gray-800 focus-within:ring-2 ring-cyan-400">
          <MdOutlineSearch className="text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 outline-none bg-transparent placeholder:text-gray-400 text-gray-200"
          />
        </div>
      </div>

      <div className="flex gap-2 items-center">
            <div onClick={() => dispatch(toggleTheme())} className="cursor-pointer text-2xl">
            {theme === "light" ? <MdOutlineDarkMode color="white"/> : <MdOutlineLightMode color="white"/>}
          </div>
          
        <NotificationPanel />
        <UserAvatar />
      </div>
    </div>
  );
};

export default Navbar;
