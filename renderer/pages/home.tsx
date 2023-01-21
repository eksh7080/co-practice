import React from "react";
import Head from "next/head";
import Link from "next/link";
import Heads from "@/components/Heads";
import { auth } from "@/pbase";

function Home() {
  console.log(auth, "dd");
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
