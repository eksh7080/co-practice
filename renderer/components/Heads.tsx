import Head from "next/head";
const Heads = ({ title }) => {
  return (
    <Head>
      {/* 파비콘은 어디서 보는걸까? */}
      {/* <link rel="shortcut icon" href="/images/favicon.ico" /> */}
      <title>{title}</title>
    </Head>
  );
};

export default Heads;
