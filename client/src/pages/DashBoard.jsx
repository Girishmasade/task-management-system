import React from "react";
import {
  MdAdminPanelSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaNewspaper, FaUsers } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import moment from "moment";
import { summary } from "../assets/data";
import clsx from "clsx";
import { Chart } from "../components/Chart";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, getInitials } from "../utils/helper";
import UserInfo from "../components/ui/UserInfo";

const TaskTable = ({ tasks }) => {
  const ICONS = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
  };

  const TableHeader = () => (
    <thead className="border-b border-gray-600 bg-gray-900 text-white">
      <tr className="text-left">
        <th className="py-3 px-4">Task Title</th>
        <th className="py-3 px-4">Priority</th>
        <th className="py-3 px-4">Team</th>
        <th className="py-3 px-4 hidden md:block">Created At</th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => (
    <tr className="border-b border-gray-700 text-gray-300 hover:bg-gray-800">
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <div className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])} />
          <p className="text-white">{task.title}</p>
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="flex gap-1 items-center">
          <span className={clsx("text-lg", PRIOTITYSTYELS[task.priority])}>
            {ICONS[task.priority]}
          </span>
          <span className="capitalize">{task.priority}</span>
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="flex">
          {task.team.map((m, index) => (
            <div
              key={index}
              className={clsx(
                "w-7 h-7 rounded-full flex items-center justify-center text-sm -mr-1 bg-blue-600"
              )}
            >
              <UserInfo user={m} />
            </div>
          ))}
        </div>
      </td>
      <td className="py-3 px-4 hidden md:block">
        <span className="text-gray-400">{moment(task?.date).fromNow()}</span>
      </td>
    </tr>
  );

  return (
    <div className="w-full md:w-2/3 bg-gray-900 px-4 py-4 shadow-lg rounded-md">
      <table className="w-full">
        <TableHeader />
        <tbody>
          {tasks?.map((task, id) => (
            <TableRow key={id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Dashboard = () => {
  const totals = summary.tasks;

  const stats = [
    { _id: "1", label: "TOTAL TASK", total: summary?.totalTasks || 0, icon: <FaNewspaper />, bg: "bg-blue-500" },
    { _id: "2", label: "COMPLETED TASK", total: totals["completed"] || 0, icon: <MdAdminPanelSettings />, bg: "bg-green-500" },
    { _id: "3", label: "TASK IN PROGRESS", total: totals["in progress"] || 0, icon: <MdEdit />, bg: "bg-yellow-500" },
    { _id: "4", label: "TODOS", total: totals["todo"], icon: <FaArrowsToDot />, bg: "bg-red-500" },
  ];

  const Card = ({ label, count, bg, icon }) => (
    <div className="w-full h-32 bg-gray-800 p-5 shadow-lg rounded-md flex items-center justify-between">
      <div className="h-full flex flex-1 flex-col justify-between">
        <p className="text-base text-gray-400">{label}</p>
        <span className="text-2xl font-semibold text-white">{count}</span>
        <span className="text-sm text-gray-500">110 last month</span>
      </div>
      <div className={clsx("w-12 h-12 rounded-full flex items-center justify-center text-white", bg)}>
        {icon}
      </div>
    </div>
  );

  return (
    <div className="h-full py-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {stats.map(({ icon, bg, label, total }, index) => (
          <Card key={index} icon={icon} bg={bg} label={label} count={total} />
        ))}
      </div>

      <div className="w-full bg-gray-900 my-16 p-4 rounded shadow-lg">
        <h4 className="text-xl text-gray-400 font-semibold">Chart by Priority</h4>
        <Chart />
      </div>

      <div className="w-full flex flex-col md:flex-row gap-4 py-8">
        <TaskTable tasks={summary.last10Task} />
      </div>
    </div>
  );
};

export default Dashboard;
