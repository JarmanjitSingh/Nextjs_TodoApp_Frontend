"use client";

import LoadingComp from "@/components/Loading/LoadingComp";
import { GlobalContext } from "@/context";
import { Box, Heading } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

const page = () => {
  const { isAuthenticated, pageLoading, user } = useContext(GlobalContext);
  const router = useRouter();

  if (pageLoading) return <LoadingComp />;
  if (!isAuthenticated) return router.push("/login");
  return (
    <Box>
      <Heading>Name: {user.name}</Heading>
      <Heading>Email: {user.email}</Heading>
    </Box>
  );
};

export default page;
