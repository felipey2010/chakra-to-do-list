import { useColorMode, IconButton, useColorModeValue } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const ThemeSwitcher = () => {
  const { toggleColorMode } = useColorMode();
  const icons = useColorModeValue(<MoonIcon />, <SunIcon />);
  const iconColors = useColorModeValue("darkgreen", "white");

  return (
    <IconButton
      aria-label="Toggle dark mode"
      icon={icons}
      onClick={toggleColorMode}
      color={iconColors}
      position="absolute"
      right={8}
      top={8}
      colorScheme="green"
    />
  );
};

export default ThemeSwitcher;
