import React, { FormEvent, useState } from "react";
import Link from "next/link";
import Heads from "@/components/Heads";
import { auth } from "@/pbase";
import {
  signInWithEmailAndPassword,
  browserSessionPersistence,
  setPersistence,
} from "firebase/auth";
import { useRouter } from "next/router";
import styled from "styled-components";

const LoginContainer = styled.section`
  display: flex;
`;

const LoginSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  & form {
    text-align: center;
    max-width: 46rem;
    width: 100%;

    & p {
      display: flex;
      justify-content: center;
      padding: 0px 3rem;

      & a {
        width: 200px;

        & img {
          width: 200px;
        }
      }
    }

    & .loginWrap {
      display: flex;
      flex-direction: column;
      gap: 2rem;

      & h1 {
        text-align: center;
        font-weight: bold;
        font-size: 4rem;
        padding-bottom: 1rem;
        font-family: "Viga", sans-serif;
      }

      & input {
        padding: 1.6rem 2rem;
        border: 1px solid #c9cacc;
        border-radius: 0.4rem;
        font-size: 1.4rem;
        line-height: 2.2rem;
        color: #7d7e80;
        width: calc(100% - 4rem);
      }

      & .util {
        display: flex;
        gap: 1rem;
        padding-left: 1rem;
        border-left: 1rem solid #e2e2e2;
        text-align: left;
        font-size: 1.2rem;
        font-weight: 400;

        & a {
          &:hover {
            font-weight: 600;
            color: black;
          }
        }
      }

      & article {
        & ul {
          font-size: 1.4rem;
          font-weight: 600;

          & .loginBtn {
            padding: 1.6rem 2rem;
            border: 0;
            background-color: #d3d3d3;
            border-radius: 0.4rem;
            font-size: 1.4rem;
            line-height: 2.2rem;
            width: 100%;
            font-weight: 600;

            &:hover {
              cursor: pointer;
              background-color: gray;
            }
          }
        }
      }
    }
  }
`;

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const passwordChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const signIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setPersistence(auth, browserSessionPersistence)
        .then(async () => {
          const { user } = await signInWithEmailAndPassword(
            auth,
            email,
            password,
          );
          localStorage.setItem("token", user.refreshToken);
          localStorage.setItem("uid", user.uid);
          localStorage.setItem("photo", user.photoURL);
          localStorage.setItem("display", user.displayName);
        })
        .then(() => {
          alert("성공적으로 로그인 되었습니다.");
          router.push("/Home");
        });
    } catch (error: unknown) {
      alert(error);
    }
  };

  return (
    <>
      <Heads title="Login" />
      <LoginContainer>
        <LoginSection>
          <form onSubmit={signIn}>
            <div className="loginWrap">
              <h1>
                <Link href="/Home">
                  <a>LOGIN</a>
                </Link>
              </h1>

              <input
                type="email"
                name="email"
                required
                placeholder="이메일"
                autoComplete="off"
                onChange={emailChangeValue}
              />

              <input
                type="password"
                name="password"
                required
                placeholder="비밀번호"
                autoComplete="off"
                onChange={passwordChangeValue}
              />

              <div className="util">
                <Link href="/Signup">
                  <a>회원가입</a>
                </Link>
              </div>

              <article>
                <ul>
                  <li>
                    <button type="submit" className="loginBtn">
                      로그인
                    </button>
                  </li>
                </ul>
              </article>
            </div>
          </form>
        </LoginSection>
      </LoginContainer>
    </>
  );
};

export default Login;
