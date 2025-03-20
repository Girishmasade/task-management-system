import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "../ui/Navbar";
import { useSelector } from "react-redux";
import Sidebar from "../ui/SideBar";
import { MobileSidebar } from "./MobileSideBar";
import Footer from "../ui/Footer";

const Layout = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  return user ? (
    <div className="w-full h-screen flex flex-col md:flex-row bg-gray-200 ">
      <div className="w-[20%] h-screen bg-white sticky top-0 hidden md:block">
      <Sidebar/>
      </div>
      <MobileSidebar/>

      <div className="w-full overflow-y-auto">
        <Navbar /> 

        <div className="p-2 2xl:px-10">
          <Outlet />
        </div>
      <div className="border-l border-white">
      <Footer/>
      </div>
      </div>

     
    </div>
  ) : (
    <Navigate to="/log-in" state={{ from: location }} replace />
  );
};

export default Layout;
