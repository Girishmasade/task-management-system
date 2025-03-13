import React, { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {

  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate()
  const value = {
    backendURL,
    navigate
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
