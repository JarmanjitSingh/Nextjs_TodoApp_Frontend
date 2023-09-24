import { Box, Spinner } from "@chakra-ui/react";
import React from "react";

const LoadingComp = () => {
  return (
    <Box h='80vh' transform={'scale(3)'} display='flex' justifyContent='center' alignItems='center'>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Box>
  );
};

export default LoadingComp;
