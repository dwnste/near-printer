import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";

import NearProvider from "../providers/NearProvider";
import GlobalStyle from "../theme/globalStyle";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NearProvider>
      <GlobalStyle />
      <Component {...pageProps} />
    </NearProvider>
  );
}
``;
