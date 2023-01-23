import React from "react";
import Head from "next/head";
import Link from "next/link";
import Heads from "@/components/Heads";

function Home() {
  return (
    <>
      <Heads title="Home" />
      <div>
        <p>
          ⚡ Electron + Next.js ⚡ -
          <Link href="/Login">
            <a>Go to next page</a>
          </Link>
        </p>
        <img src="/images/logo.png" />
      </div>
    </>
  );
}

export default Home;
