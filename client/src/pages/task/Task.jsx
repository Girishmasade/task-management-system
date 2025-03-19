import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import Loading from "../../components/Loader";
import Title from "../../components/Title";
import Button from "../../components/Button";
import Tabs from "../../components/Tabs";
import TaskTitle from "../../components/TaskTitle";
import Board from "../../components/Board";
import Table from "../../components/task/Table";
import AddTask from "../../components/task/AddTask";
import { tasks } from "../../assets/data";

const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};

const Task = () => {
  const params = useParams();
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const status = params?.status || "";

  const renderContent = useMemo(() => {
    if (selected === 1) return <Table tasks={tasks} />;
    return <Board tasks={tasks} />;
  }, [selected, tasks]);

  if (loading) {
    return (
      <div className="py-10 flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <Title title={status ? `${status} Tasks` : "Tasks"} />
        {!status && (
          <Button
            onClick={() => setOpen(true)}
            label="Create Task"
            icon={<IoMdAdd className="text-lg" />}
            className="bg-blue-600 hover:bg-blue-700 text-black px-4 py-2 rounded-md flex items-center gap-2"
          />
        )}
      </div>

      <Tabs tabs={TABS} setSelected={setSelected} />

      {!status && (
        <div className="flex gap-4 my-4">
          <TaskTitle label="To Do" className={TASK_TYPE.todo} />
          <TaskTitle label="In Progress" className={TASK_TYPE["in progress"]} />
          <TaskTitle label="Completed" className={TASK_TYPE.completed} />
        </div>
      )}

      {renderContent}

      <AddTask open={open} setOpen={setOpen} />
    </div>
  );
};

export default Task;
