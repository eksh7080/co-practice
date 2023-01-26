import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "@/pbase";
import styled from "styled-components";
import { ChatContext } from "@/context/chatContext";

const HContainer = styled.section`
  max-width: 100%;
  margin-bottom: 5rem;
`;

const HHeader = styled.header`
  display: flex;
  justify-content: space-around;
  padding: 4rem 1rem;
  align-items: center;
  font-size: 2rem;
  border-bottom: 1px solid #b0e0e6;
  box-sizing: border-box;
  font-weight: 600;
  width: 100%;

  & nav {
    & ul {
      display: flex;
      gap: 2rem;

      & li {
        &:hover {
          opacity: 0.7;
        }
      }
    }
  }
`;

const Header = () => {
  const router = useRouter();
  const { dispatch } = useContext(ChatContext);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logout = async () => {
    await signOut(auth);
    setIsLoggedIn(false);
    localStorage.clear();
    dispatch({
      type: "CHANGE_USER",
      payload: {
        chatId: "",
        user: {
          chatId: null,
          user: {
            displayName: "",
            photoURL: null,
            uid: "",
          },
        },
      },
    });
  };

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("token") ? true : false);
  }, [router.pathname]);

  return (
    <HContainer>
      <HHeader>
        <nav>
          <ul>
            <li>
              <Link href="/Home">Home</Link>
            </li>
            {isLoggedIn ? (
              <>
                <li onClick={logout}>
                  <Link href="/Home">
                    <a>로그아웃</a>
                  </Link>
                </li>
                <li>
                  <Link href="/Userlist">
                    <a>유저 목록</a>
                  </Link>
                </li>
                <li>
                  <Link href="/privateChat/PrivateChatHome">
                    <a>1:1 채팅</a>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/Login">
                    <a>로그인</a>
                  </Link>
                </li>
                <li>
                  <Link href="/Signup">
                    <a>회원가입</a>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </HHeader>
    </HContainer>
  );
};

export default Header;
