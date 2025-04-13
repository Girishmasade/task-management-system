import React from "react";
import {
  MdDashboard,
  MdOutlineAddTask,
  MdOutlinePendingActions,
  MdTaskAlt,
} from "react-icons/md";
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setOpenSidebar } from "../../redux/slice/authSlice";
import clsx from "clsx";
import { IoIosVideocam } from "react-icons/io";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";



const linkData = [
  {
    label: "Dashboard",
    link: "dashboard",
    icon: <MdDashboard />,
  },
  {
    label: "Tasks",
    link: "tasks",
    icon: <FaTasks />,
  },
  {
    label: "Completed",
    link: "completed/completed",
    icon: <MdTaskAlt />,
  },
  {
    label: "In Progress",
    link: "in-progress/in progress",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "To Do",
    link: "todo/todo",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "Team",
    link: "team",
    icon: <FaUsers />,
  },

  {
    label: "Trash",
    link: "trashed",
    icon: <FaTrashAlt />,
  },

  {
    label: "meet",
    link: "meet",
    icon: <IoIosVideocam />
  },

  {
    label: "chat",
    link: "chat",
    icon: <IoChatbubbleEllipsesSharp />

  },
];

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 9);

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  const NavLink = ({ el }) => {
    return (
      <Link
        to={el.link}
        onClick={closeSidebar}
        className={clsx(
          "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-300 text-base hover:bg-gray-700 transition duration-300",
          path === el.link.split("/")[0] ? "bg-gradient-to-r from-green-500 to-cyan-400 text-white" : ""
        )}
      >
        {el.icon}
        <span className="hover:text-cyan-400">{el.label}</span>
      </Link>
    );
  };

  return (
    <div className="w-full h-full flex flex-col gap-6 p-5 bg-gray-900">
      
      <h1 className="flex gap-2 items-center">
        <p className="bg-gradient-to-r from-cyan-200 to-green-100p-2 rounded-full">
          <MdOutlineAddTask className="text-white text-2xl font-black" />
        </p>
        <span className="text-2xl font-bold text-gray-200">T-M-S</span>
      </h1>

      <div className="flex-1 flex flex-col gap-y-5 py-8">
        {sidebarLinks.map((link) => (
          <NavLink el={link} key={link.label} />
        ))}
      </div>

      <div>
      
      </div>
    </div>
  );
};

export default Sidebar;
