import React from "react";
import TaskCard from "./TaskCard";
import { useSelector } from "react-redux";
import { useGetAllTaskQuery } from "../redux/slice/app/taskApiSlice";

const BoardView = () => {
  const { stageFilter, isTrashed, searchQuery } = useSelector((state) => state.filter); // Customize based on your store

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAllTaskQuery({
    strQuery: stageFilter || "",
    isTrashed: isTrashed || false,
    search: searchQuery || "",
  });

  if (isLoading) {
    return <p className="text-center py-10">Loading tasks...</p>;
  }

  if (isError) {
    return <p className="text-red-500 text-center py-10">Error: {error?.data?.message || "Something went wrong"}</p>;
  }

  const tasks = data?.tasks || [];

  if (!tasks.length) {
    return <p className="text-center text-gray-400 py-10">No tasks found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
};

export default BoardView;
