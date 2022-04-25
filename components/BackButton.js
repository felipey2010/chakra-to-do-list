import { IconButton } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import Link from "next/link";

export default function BackButton({ url }) {
  return (
    <Link href={url}>
      <a>
        <IconButton
          aria-label="Back"
          icon={<ArrowBackIcon />}
          position="absolute"
          top={8}
          left={8}
          size="lg"
          colorScheme="green"
        />
      </a>
    </Link>
  );
}
