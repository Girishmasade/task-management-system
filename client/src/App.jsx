import React, { useEffect } from "react";
import Router from "./routers/Router";
import { useSelector } from "react-redux";

const App = () => {

  const theme = useSelector((state) => state.auth.theme); // get theme from redux

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark"); // <html class="dark">
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  return (
    <div>
      <Router />
    </div>
  );
};

export default App;
