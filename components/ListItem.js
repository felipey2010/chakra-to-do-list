import { useState, useContext } from "react";
import { CloseIcon } from "@chakra-ui/icons";
import { AppContext } from "../utils/AppContext";
import { Stack, Checkbox, Text, IconButton, HStack } from "@chakra-ui/react";
import Link from "next/link";

export default function ListItem({ item }) {
  const [checked, setChecked] = useState(item.checked);
  const { renderCompleted, deleteItem } = useContext(AppContext);

  function handleCheck(e) {
    setChecked(e.target.checked);

    const newItem = {
      id: item.id,
      text: item.text,
      checked: e.target.checked,
    };

    renderCompleted(newItem);
  }

  return (
    <Stack spacing={5} direction="row">
      <Checkbox
        colorScheme="green"
        isChecked={checked}
        onChange={e => handleCheck(e)}
      />
      <HStack w="100%" justify="space-between">
        <Link href={"/list/item/" + item.id}>
          {checked ? (
            <Text fontStyle="italic" cursor="pointer" w="100%">
              <del>{item.text}</del>
            </Text>
          ) : (
            <Text fontStyle="italic" cursor="pointer" w="100%">
              {item.text}
            </Text>
          )}
        </Link>

        <IconButton
          aria-label="Excluir item"
          colorScheme="green"
          variant="ghost"
          icon={<CloseIcon />}
          onClick={() => deleteItem(item)}
        />
      </HStack>
    </Stack>
  );
}
