import Header from "./Header";
import Head from "next/head";
import Heads from "./Heads";

const Layout = ({ children }) => {
  return (
    <>
      <Heads title="Practice">
        <title>Practice</title>
      </Heads>
      <Header />
      <div>{children}</div>
    </>
  );
};

export default Layout;
