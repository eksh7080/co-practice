import Layout from "@/components/Layout";
import type { AppProps } from "next/app";
import { AuthContextProvider } from "@/context/authContext";
import GlobalStyle from "@/styles/GlobalStyle";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Layout>
        <GlobalStyle />
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  );
}
