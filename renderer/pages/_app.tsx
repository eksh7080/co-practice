import Layout from "@/components/Layout";
import type { AppProps } from "next/app";
import GlobalStyle from "@/styles/GlobalStyle";
import { ChatContextProvider } from "@/context/chatContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChatContextProvider>
      <Layout>
        <GlobalStyle />
        <Component {...pageProps} />
      </Layout>
    </ChatContextProvider>
  );
}
