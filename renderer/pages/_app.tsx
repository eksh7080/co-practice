import Layout from "@/components/Layout";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/context/authContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
