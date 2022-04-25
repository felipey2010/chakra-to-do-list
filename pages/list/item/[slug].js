import { useState, useContext, useEffect } from "react";
import Head from "next/head";
import ThemeSwitcher from "../../../components/themeSwitcher";
import BackButton from "../../../components/BackButton";
import { AppContext } from "../../../utils/AppContext";
import Footer from "../../../components/footer";
import {
  Container,
  HStack,
  Box,
  Button,
  Input,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import Router, { useRouter } from "next/router";
import Link from "next/link";

export default function Item() {
  const { list, completedList, updateList, updateCompletedList } =
    useContext(AppContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const router = useRouter();
  const { slug } = router.query;

  const [item, setItem] = useState([]);

  const [text, setText] = useState();

  function handleEnterKey(key) {
    if (key === "Enter") {
      saveItem();
    }
  }

  function saveItem() {
    if (text.length > 0) {
      const newItem = {
        id: item.id,
        text: text,
        checked: item.checked,
      };
      if (item.checked) {
        updateCompletedList(newItem);
      } else {
        updateList(newItem);
      }
    }

    Router.push("/list");
  }

  useEffect(() => {
    let flag = 0;

    setItem(
      list.map(item => {
        if (item.id === slug) {
          flag = 1;
          setText(item.text);
          return item;
        }
      })
    );

    if (flag === 0) {
      setError(true);
    } else {
      setError(false);
    }

    setLoading(false);
  }, []);

  return (
    <Container maxW="md" height="100vh" centerContent>
      <Head>
        <title>Lista - Item</title>
      </Head>

      <ThemeSwitcher />
      <BackButton url="/list" />

      <Box
        w="50vw"
        borderWidth="1px"
        borderRadius="lg"
        maxH="65%"
        p={3}
        mt="20vh"
        overflow="hidden">
        <Skeleton isLoaded={!loading} w="100%" borderRadius="lg">
          {error ? (
            <Box w="100%" textAlign="center">
              <Text fontSize="18px" textTransform="uppercase" fontWeight="bold">
                Erro ao carregar item
              </Text>
              <Link href="/list" colorScheme="green">
                Clique para retornar
              </Link>
            </Box>
          ) : (
            <HStack m="8px 2px" justify="space-between">
              <Input
                w="85%"
                m="0 12px"
                colorScheme="green"
                required
                placeholder="O que deseja anotar?"
                onKeyDown={e => handleEnterKey(e.key)}
                value={text}
                onChange={e => setText(e.target.value)}
              />
              <Button
                colorScheme="green"
                variant="outline"
                onClick={() => saveItem()}>
                Atualizar
              </Button>
            </HStack>
          )}
        </Skeleton>
      </Box>

      <Footer />
    </Container>
  );
}
