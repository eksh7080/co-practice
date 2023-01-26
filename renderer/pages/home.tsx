import React, { useEffect, useState } from "react";
import Link from "next/link";
import Heads from "@/components/Heads";
import styled from "styled-components";
import { useRouter } from "next/router";

const HContainer = styled.section`
  max-width: 128rem;
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
`;

const NotAuthContainer = styled.div`
  text-align: center;

  & h1 {
    font-size: 2.4rem;
  }

  & dl {
    & dt {
      font-size: 2rem;
      font-weight: 600;
    }
  }
`;

function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("token") ? true : false);
  }, [isLoggedIn, router.pathname]);

  return (
    <>
      <HContainer>
        <Heads title="Home" />

        {isLoggedIn ? (
          <h1>로그인이 완료되었습니다.</h1>
        ) : (
          <NotAuthContainer>
            <h1>이곳은 홈페이지 입니다.</h1>
            <dl>
              <dt>로그인 또는 회원가입을 진행해주세요.</dt>
            </dl>
          </NotAuthContainer>
        )}
      </HContainer>
    </>
  );
}

export default Home;
