"use client";

import { GlobalContext } from "@/context";
import { Box, Button, Image } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";

const Navbar = () => {
  const router = useRouter();
  const { isAuthenticated, setIsAuthenticated, pageLoading } =
    useContext(GlobalContext);
  const [loading, setLoading] = useState(false);


  const handleLogoutClick = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://nodejs-todobackend-2023.onrender.com/api/v1/users/logout",
        null,
        { withCredentials: true }
      );

      toast.success(data.message);
      setLoading(false);
      setIsAuthenticated(false);
      router.push("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
      setIsAuthenticated(true);
    }
  };

  return (
    <Box
      boxShadow="0 4px 8px 0 rgb(214 212 212 / 20%), 0 6px 20px 0 rgb(244 217 217 / 19%)"
      h={20}
      display="flex"
      p={4}
      justifyContent="space-between"
    >
      <Image
        src="https://www.any.do/v5/images/any-do-logo.svg"
        alt="logo"
        onClick={() => router.push("/")}
        cursor="pointer"
      />

      {!pageLoading && (
        <Box display="flex" gap={4}>
          <Button colorScheme="blue" onClick={() => router.push("/")}>
            Home
          </Button>
          {isAuthenticated ? (
            <>
              <Button colorScheme="blue" onClick={() => router.push("/home")}>
                Tasks
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => router.push("/profile")}
              >
                Profile
              </Button>
            </>
          ) : (
            ""
          )}
          {isAuthenticated ? (
            <Button
              isLoading={loading}
              colorScheme="blue"
              onClick={handleLogoutClick}
            >
              Logout
            </Button>
          ) : (
            <Button colorScheme="blue" onClick={() => router.push("/login")}>
              Login
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
