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
  name: "",
  email: "",
  password: "",
};
const page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState(initialData);
  const [submitting, setSubmitting] = useState(false);
  const {isAuthenticated, pageLoading} = useContext(GlobalContext)

  const handleRegisterClick = async () => {
    setSubmitting(true);
    try {
      const { data } = await axios.post(
        "https://nodejs-todobackend-2023.onrender.com/api/v1/users/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setSubmitting(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setSubmitting(false);
    }
  };

  if(pageLoading) return <LoadingComp />
  if(isAuthenticated) return router.push("/home")
  return (
    <Container
      boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
      height="500px"
      display="flex"
      justifyContent="space-evenly"
      flexDirection="column"
      alignItems="center"
      mt={10}
      p={6}
      borderRadius={10}
    >
      <Heading>Sign up account</Heading>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          placeholder="Enter your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </FormControl>
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
        <Text color="gray.600">already have an account?</Text>
        <Text
          color="blue.600"
          fontWeight="bold"
          onClick={() => router.push("/login")}
        >
          Login
        </Text>
      </Box>
      <Button
        isLoading={submitting}
        loadingText="Signing in"
        colorScheme="blue"
        w="full"
        onClick={handleRegisterClick}
      >
        Sign up
      </Button>
    </Container>
  );
};

export default page;
