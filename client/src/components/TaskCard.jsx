import clsx from "clsx";
import React, { useState } from "react";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdDelete,
  MdEdit,
  MdSave,
  MdClose,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from "../utils/helper";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaList, FaEye, FaVideo } from "react-icons/fa";
import UserInfo from "./ui/UserInfo";
import { useNavigate } from "react-router-dom";
import { useTrashTaskMutation, useUpdateTaskMutation } from '../redux/slice/app/taskApiSlice'

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const TaskCard = ({ task, onTaskUpdated }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [trashTask] = useTrashTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleOpenTask = () => {
    if (!user?.isAdmin) navigate(`/task/${task._id}`);
  };

  const handleMeetTask = () => {
    navigate('/meet', { state: { task } });
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this task?");
    if (confirmed) {
      try {
        await trashTask({ id: task._id, data: { isDeleted: true } }).unwrap();
        onTaskUpdated?.(); // Refresh task list
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };
  

  const handleUpdate = async () => {
    try {
      await updateTask({ ...task, title: editedTitle }).unwrap();
      setIsEditing(false);
      onTaskUpdated?.();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="w-full h-fit bg-gray-800 text-white shadow-md p-4 rounded relative group">
      <div className="w-full flex justify-between">
        <div
          className={clsx(
            "flex flex-1 gap-1 items-center text-sm font-medium",
            PRIOTITYSTYELS[task?.priority]
          )}
        >
          <span className="text-lg">{ICONS[task?.priority]}</span>
          <span className="uppercase">{task?.priority} Priority</span>
        </div>

        {user?.isAdmin ? (
          <div className="flex gap-4">
            {!isEditing ? (
              <>
                <button onClick={() => setIsEditing(true)} className="text-2xl text-yellow-400 hover:underline">
                  <MdEdit />
                </button>
                <button onClick={handleDelete} className="text-2xl text-red-400 hover:underline">
                  <MdDelete />
                </button>
              </>
            ) : (
              <>
                <button onClick={handleUpdate} className="text-2xl text-green-400">
                  <MdSave />
                </button>
                <button onClick={() => setIsEditing(false)} className="text-2xl text-gray-400">
                  <MdClose />
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="flex gap-4">
            <button onClick={handleOpenTask} className="text-2xl text-blue-400 hover:underline">
              <FaEye />
            </button>
            <button onClick={handleMeetTask} className="text-2xl text-green-400 hover:underline">
              <FaVideo />
            </button>
          </div>
        )}
      </div>

      {/* Editable Title */}
      <div className="flex items-center gap-2 mt-2">
        <div
          className={clsx(
            "w-4 h-4 rounded-full",
            TASK_TYPE[task.stage?.toLowerCase()] ?? "bg-gray-500"
          )}
        />
        {!isEditing ? (
          <h4 className="line-clamp-1 text-white font-medium">{task?.title}</h4>
        ) : (
          <input
            className="bg-gray-700 text-white p-1 px-2 rounded w-full"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        )}
      </div>

      <span className="text-sm text-gray-400">{formatDate(new Date(task?.date))}</span>

      <div className="w-full border-t border-gray-600 my-2" />

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="flex gap-1 items-center text-sm text-gray-400">
            <BiMessageAltDetail />
            <span>{task?.activities?.length}</span>
          </div>
          <div className="flex gap-1 items-center text-sm text-gray-400">
            <MdAttachFile />
            <span>{task?.assets?.length}</span>
          </div>
          <div className="flex gap-1 items-center text-sm text-gray-400">
            <FaList />
            <span>0/{task?.subTasks?.length}</span>
          </div>
        </div>

        <div className="flex flex-row-reverse">
          {task?.team?.map((m, index) => (
            <div
              key={index}
              className={clsx(
                "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                BGS[index % BGS.length]
              )}
            >
              <UserInfo user={m} />
            </div>
          ))}
        </div>
      </div>

      {task?.subTasks?.length > 0 && (
        <div className="py-4 border-t border-gray-600">
          <h5 className="text-base line-clamp-1 text-white font-medium">
            {task?.subTasks[0]?.title}
          </h5>
          <div className="p-2 flex justify-between items-center text-sm">
            <span className="text-gray-400">
              {formatDate(new Date(task?.subTasks[0]?.date))}
            </span>
            <span className="bg-blue-600/10 px-3 py-1 rounded-full text-blue-700 font-medium">
              {task?.subTasks[0]?.tag}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
