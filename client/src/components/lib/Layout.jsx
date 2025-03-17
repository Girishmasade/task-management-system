import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "../ui/Navbar";

const Layout = () => {
  const user = "";
  const location = useLocation();

  return user ? (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <div className="w-1/5 h-screen bg-white sticky top-0 hidden md:block">
        {/* SideBar */}
      </div>
      {/* MobileSidebar */}

      <div className="flex-1 overflow-y-auto">
        <Navbar />

        <div className="p-4 2xl:px-10">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/log-in" state={{ from: location }} replace />
  );
};

export default Layout;
