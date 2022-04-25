import AppProvider from "../utils/AppContext";
import { ColorModeScript } from "@chakra-ui/react";
import { Chakra } from "../Chakra";

export default function MyApp({ Component, pageProps }) {
  return (
    <Chakra cookies={pageProps.cookies}>
      <AppProvider>
        <ColorModeScript />
        <Component {...pageProps} />
      </AppProvider>
    </Chakra>
  );
}
