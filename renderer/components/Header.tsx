import Link from "next/link";
import { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "@/pbase";
import styled from "styled-components";

interface UserAuth {
  token: string | null;
  uid: string | null;
}

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser ? false : true);

  const router = useRouter();
  const [userAuth, setUserAuth] = useState<UserAuth>({
    token: "" | null,
    uid: "" | null,
  });

  useEffect(() => {
    setUserAuth({
      token: localStorage.getItem("token"),
      uid: localStorage.getItem("uid"),
    });
  }, [router.pathname]);

  const logout = async () => {
    const res = await signOut(auth);
    console.log(res, "ddd");
    localStorage.clear();
    setUserAuth({
      token: null,
      uid: null,
    });
  };

  console.log(isLoggedIn, auth.currentUser);

  return (
    <section className="HContainer">
      <header>
        <nav>
          <ul>
            {userAuth.token ? (
              <>
                <li onClick={logout}>
                  <Link href="/home">
                    <a>로그아웃</a>
                  </Link>
                </li>
                <li>
                  <Link href="/Userlist">
                    <a>유저 목록</a>
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link href="/Login">
                  <a>로그인</a>
                </Link>
              </li>
            )}

            <li>
              <Link href="/Signup">
                <a>회원가입</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <style jsx>
        {`
          ul,
          li {
            list-style: none;
          }

          a,
          a:visited,
          a:link,
          a:active {
            color: #000;
            text-decoration: none;
          }

          .HContainer {
            max-width: 1280px;
          }

          header > nav > ul {
            display: flex;
            flex-direction: column;
            margin: 0;
            padding: 0;
          }
        `}
      </style>
    </section>
  );
};

export default Header;
