"use client";
import LoadingComp from "@/components/Loading/LoadingComp";
import { GlobalContext } from "@/context";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiTwotoneDelete } from "react-icons/ai";

const initialData = {
  title: "",
  description: "",
};

const allLoadings = {
  addLoading: false,
  deleteLoading: false,
};
const page = () => {
  const { isAuthenticated, pageLoading } = useContext(GlobalContext);
  const [formData, setFormData] = useState(initialData);
  const [allTasks, setAllTasks] = useState(null);
  const [loadingStates, setLoadingStates] = useState(allLoadings);
  const router = useRouter();

  const handleAddTask = async () => {
    setLoadingStates({ ...loadingStates, addLoading: true });
    try {
      const { data } = await axios.post(
        "https://nodejs-todobackend-2023.onrender.com/api/v1/task/newTask",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setFormData(initialData);
      setLoadingStates({ ...loadingStates, addLoading: false });

      fetchAllTasks();
    } catch (error) {
      console.log(error);
      setLoadingStates({ ...loadingStates, addLoading: false });
      toast.error(error.response.data.message);
    }
  };

  const fetchAllTasks = async () => {
    try {
      const { data } = await axios.get(
        "https://nodejs-todobackend-2023.onrender.com/api/v1/task/my",
        {
          withCredentials: true,
        }
      );

      setAllTasks(data.tasks);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTask = async (id) => {
    setLoadingStates({ ...loadingStates, deleteLoading: true });
    try {
      const { data } = await axios.delete(
        `https://nodejs-todobackend-2023.onrender.com/api/v1/task/${id}`,
        {
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setLoadingStates({ ...loadingStates, deleteLoading: false });
      fetchAllTasks();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoadingStates({ ...loadingStates, deleteLoading: false });
    }
  };

  const handleTaskUpdate = async (id) => {
    try {
      const { data } = await axios.put(
        `https://nodejs-todobackend-2023.onrender.com/api/v1/task/${id}`,
        null,
        {
          withCredentials: true,
        }
      );
      toast.success(data.message);
      fetchAllTasks();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  if (pageLoading) return <LoadingComp />;
  if (!isAuthenticated) return router.push("/login");
  return (
    <Box>
      <Container
        textAlign={"center"}
        mt={6}
        boxShadow={"xl"}
        p={6}
        borderRadius={"10px"}
      >
        <Heading>All Tasks</Heading>
        <Box display={"flex"} flexDirection={"column"} gap={"20px"} mt={6}>
          <Input
            bg={"white"}
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Write task title ..."
          />
          <Input
            bg={"white"}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Write task description ..."
          />
          <Button
            isLoading={loadingStates.addLoading}
            loadingText="Adding Task"
            colorScheme="blue"
            w={"full"}
            onClick={handleAddTask}
          >
            Add
          </Button>
        </Box>
      </Container>

      <Container mt={6} maxW={"container.md"}>
        {allTasks &&
          allTasks.length > 0 &&
          allTasks.map((task) => (
            <Box
              key={task._id}
              minH={"100px"}
              p={4}
              borderRadius={"10px"}
              boxShadow={"lg"}
              display={"flex"}
            >
              <Box w={"80%"}>
                <Heading size={"lg"}>{task.title}</Heading>
                <Text>{task.description}</Text>
              </Box>
              <Box
                w={"20%"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-evenly"}
              >
                <Checkbox
                  defaultChecked={task.isCompleted}
                  onChange={() => handleTaskUpdate(task._id)}
                ></Checkbox>
                <Button
                  colorScheme="red"
                  size={"sm"}
                  isLoading={loadingStates.deleteLoading}
                  onClick={() => handleDeleteTask(task._id)}
                >
                  {" "}
                  <AiTwotoneDelete size={18} />
                </Button>
              </Box>
            </Box>
          ))}
      </Container>
    </Box>
  );
};

export default page;
