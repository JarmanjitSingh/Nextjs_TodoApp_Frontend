"use client";
import LoadingComp from "@/components/Loading/LoadingComp";
import { GlobalContext } from "@/context";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";

const initialData = {
  email: "",
  password: "",
};
const page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState(initialData);
  const [Submitting, setSubmitting] = useState(false);
  const {isAuthenticated, setIsAuthenticated, pageLoading} = useContext(GlobalContext)

  const handleSubmitClick = async () => {
     setSubmitting(true)
    try {
      const {data} = await axios.post(
        "https://nodejs-todobackend-2023.onrender.com/api/v1/users/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
        setSubmitting(false);
        toast.success(data.message);
        setIsAuthenticated(true)
        
    } catch (error) {
      console.log("hello error", error);
      setSubmitting(false);
      toast.error(error.response.data.message);
      setIsAuthenticated(false)
    }
  };

  if(pageLoading) return <LoadingComp />
  if(isAuthenticated) return router.push("/home")
  return (
    <Container
      boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
      height="400px"
      display="flex"
      justifyContent="space-evenly"
      flexDirection="column"
      alignItems="center"
      mt={10}
      p={6}
      borderRadius={10}
    >
      <Heading>Login to your profile</Heading>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
      </FormControl>
      <Box
        display="flex"
        justifyContent="space-between"
        w="95%"
        cursor="pointer"
      >
        <Text color="gray.600">Don't have any account?</Text>
        <Text
          color="blue.600"
          fontWeight="bold"
          onClick={() => router.push("/signup")}
        >
          Sign up
        </Text>
      </Box>
      <Button
        isLoading={Submitting}
        loadingText="Loging in"
        colorScheme="blue"
        w="full"
        onClick={handleSubmitClick}
      >
        Login
      </Button>
    </Container>
  );
};

export default page;
