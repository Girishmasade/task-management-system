import { Navigate, Route, Routes } from "react-router-dom";
import Task from "../pages/task/Task";
import Login from "../pages/authantication/Login"; //
import Dashboard from "../pages/DashBoard"; //
import TaskDetails from "../pages/task/TaskDetails";
import Team from "../pages/Team";
import Trash from "../pages/Trash";
import About from "../pages/About";
import { Toaster } from "sonner"; 
import Layout from "../components/lib/Layout";
import Signup from "../pages/authantication/Signup";

const Router = () => {
  return (
    <main className="p-2">
      <Routes>
        {/* Protected Routes (Require Authentication) */}
        <Route element={<Layout />}>
          <Route index path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Task />} />
          <Route path="/completed/:status" element={<Task />} />
          <Route path="/in-progress/:status" element={<Task />} />
          <Route path="/todo/:status" element={<Task />} />
          <Route path="/task/:id" element={<TaskDetails />} />
          <Route path="/team" element={<Team />} />
          <Route path="/trashed" element={<Trash />} />
          <Route path="/about" element={<About />} />
        </Route>

        {/* Public Routes */}
        <Route path="/log-in" element={<Login />} />
        <Route path="/sign-up" element={<Signup/>} />
      </Routes>

      {/* Toaster Notifications */}
      <Toaster richColors />
    </main>
  );
};

export default Router;
