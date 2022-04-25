import { useContext, useState, useRef } from "react";
import Head from "next/head";
import ThemeSwitcher from "../../components/themeSwitcher";
import BackButton from "../../components/BackButton";
import { AppContext } from "../../utils/AppContext";
import Footer from "../../components/footer";
import ListItem from "../../components/ListItem";
import {
  Container,
  HStack,
  Box,
  Button,
  Input,
  Stack,
  StackDivider,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Home() {
  const { list, addItem, toggle, setToggle } = useContext(AppContext);

  const [text, setText] = useState("");

  const toast = useToast();
  const toastIdRef = useRef();

  function handleEnterKey(key) {
    if (key === "Enter") {
      saveItem();
    }
  }

  function saveItem() {
    if (text.length > 0) {
      addItem(text);
      setText("");
    } else {
      toastIdRef.current = toast({
        description: "Ah não! Conteúdo vazio!",
        position: "top",
        isClosable: "true",
        duration: 2000,
        status: "error",
        variant: "solid",
      });
    }
  }

  return (
    <Container maxW="md" height="100vh" centerContent>
      <Head>
        <title>Lista - Create</title>
      </Head>

      <BackButton url="/" />
      <ThemeSwitcher />
      <Box
        w={["85vw", "75vw", "50vw"]}
        borderWidth="1px"
        borderRadius="lg"
        maxH="65%"
        p={3}
        mt="20vh"
        overflow="hidden">
        <HStack justify="flex-end" mb="12px">
          <Button colorScheme="green" onClick={() => setToggle(!toggle)}>
            {toggle ? "Tarefas Atuais" : "Tarefa finalizada"}
          </Button>
        </HStack>

        <Stack
          direction={["column", "row", "row"]}
          m="8px 2px"
          justify="space-between">
          <Input
            w={["100%", "85%", "85%"]}
            m={["0", "0 12px", "0 12px"]}
            colorScheme="green"
            required
            border="2px"
            s
            _placeholder={{
              color: useColorModeValue("blackAlpha.600", "whiteAlpha.600"),
            }}
            placeholder="O que deseja anotar?"
            onKeyDown={e => handleEnterKey(e.key)}
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <Button
            colorScheme="green"
            variant="outline"
            onClick={() => saveItem()}>
            Add
          </Button>
        </Stack>

        {list && (
          <Stack
            direction="column"
            maxH="45vh"
            overflowY="auto"
            spacing={2}
            m="0 4px 14px 14px"
            divider={<StackDivider borderColor="blackAlpha.300" />}>
            {list
              .slice(0)
              .reverse()
              .map(
                item =>
                  item.checked === toggle && (
                    <ListItem item={item} key={item.id} />
                  )
              )}
          </Stack>
        )}
      </Box>

      <Footer />
    </Container>
  );
}
