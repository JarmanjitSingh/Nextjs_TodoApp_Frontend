"use client";

import axios from "axios";
import { usePathname } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext({
  isAuthenticated: false,
  user: {},
  pageLoading: true
});

const AppWrapper = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [pageLoading, setPageLoading] = useState(true)

  const pathname = usePathname();

  useEffect(() => {
      axios
        .get("https://nodejs-todobackend-2023.onrender.com/api/v1/users/me", {
          withCredentials: true,
        })
        .then((res) => {
            setIsAuthenticated(true)
            setPageLoading(false)
            setUser(res.data.user)
        })
        .catch((error) => {
            setIsAuthenticated(false)
            setPageLoading(false)
            setUser({})
        });
    
  }, [isAuthenticated, pathname]);

  return (
    <GlobalContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser, pageLoading, setPageLoading }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default AppWrapper;
