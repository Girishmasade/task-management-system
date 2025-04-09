import { Navigate, Route, Routes } from "react-router-dom";
import Task from "../pages/task/Task";
import Login from "../pages/authantication/Login"; //
import TaskDetails from "../pages/task/TaskDetails";
import Team from "../pages/Team";
import Trash from "../pages/Trash";
import { Toaster } from "sonner"; 
import Layout from "../components/lib/Layout";
import Dashboard from "../pages/DashBoard";
import SignUp from "../pages/authantication/Signup";

const Router = () => {
  return (
    <main  className='w-full min-h-screen bg-[#f3f4f6] '>

<Routes>
        <Route element={<Layout />}>
          <Route index path='/' element={<Navigate to='/dashboard' />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/tasks' element={<Task />} />
          <Route path='/completed/:status' element={<Task />} />
          <Route path='/in-progress/:status' element={<Task />} />
          <Route path='/todo/:status' element={<Task />} />
          <Route path='/team' element={<Team />} />
          <Route path='/trashed' element={<Trash />} />
          <Route path='/task/:id' element={<TaskDetails />} />
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>

      <Toaster richColors />

    </main>
  );
};

export default Router;
