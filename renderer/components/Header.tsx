import Link from "next/link";
import { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "@/pbase";
import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";

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

interface UserAuth {
  token: string | null;
}

const Header = () => {
  const router = useRouter();
  const [userAuth, setUserAuth] = useState<UserAuth>({
    token: "" | null,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const [user] = useAuthState(auth);
  // console.log(user, "dhdkdhdkdk");

  useEffect(() => {
    // auth.onAuthStateChanged(user => {
    //   if (user) setIsLoggedIn(true);
    //   else setIsLoggedIn(false);
    //   console.log(user, "asd", isLoggedIn);
    // });
    setUserAuth(sessionStorage.getItem("token"));
  }, [router.pathname]);

  const logout = async () => {
    await signOut(auth).then(() => console.log("ddd 성공"));
    setUserAuth(null);
    sessionStorage.clear();
  };

  return (
    <HContainer>
      <HHeader>
        <nav>
          <ul>
            {userAuth ? (
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
