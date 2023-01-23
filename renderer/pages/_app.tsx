import Layout from "@/components/Layout";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/context/authContext";
import GlobalStyle from "@/styles/GlobalStyle";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <GlobalStyle />
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
