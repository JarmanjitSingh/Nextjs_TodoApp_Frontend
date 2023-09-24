import { Container, Heading } from "@chakra-ui/react";

export default function Home() {
  return (
    <Container
      maxW="container.xl"
      h="80vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Heading>Welcome To The Best Todo App.</Heading>
    </Container>
  );
}
