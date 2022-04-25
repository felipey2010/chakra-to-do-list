import { LinkBox, LinkOverlay } from "@chakra-ui/react";

export default function Footer() {
  return (
    <LinkBox
      as="footer"
      w="100%"
      position="absolute"
      bottom={0}
      right={0}
      left={0}
      textAlign="center"
      p={4}
      borderTopWidth={1}>
      <LinkOverlay
        href="https://github.com/felipey2010"
        isExternal
        _hover={{ color: "red.500", transition: "0.3s ease-in-out" }}
        fontSize={"md"}>
        Criado por Felipey - {new Date().getFullYear()}
      </LinkOverlay>
    </LinkBox>
  );
}
