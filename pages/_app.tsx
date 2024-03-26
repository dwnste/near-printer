import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";

import { GlobalStyle } from "../theme/globalStyle";
import { NearProvider } from "../components/NearProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NearProvider>
      <GlobalStyle />
      <Component {...pageProps} />
    </NearProvider>
  );
}
``;
