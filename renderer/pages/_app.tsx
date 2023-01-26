import Layout from "@/components/Layout";
import type { AppProps } from "next/app";
import { AuthContextProvider } from "@/context/authContext";
import GlobalStyle from "@/styles/GlobalStyle";
import { ChatContextProvider } from "@/context/chatContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChatContextProvider>
      <AuthContextProvider>
        <Layout>
          <GlobalStyle />
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
    </ChatContextProvider>
  );
}
