import React, { useState } from "react";
import Link from "next/link";
import Heads from "@/components/Heads";
import { auth } from "@/pbase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { useUserDispatch } from "@/context/authContext";

const Login = () => {
  const dispatch = useUserDispatch();
  const router = useRouter();
  const isUserExist = auth.currentUser;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const passwordChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const signIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("uid", user.uid);

      if (user) {
        alert("성공적으로 로그인 되었습니다.");
        router.push("/home");
      }

      console.log(user);
    } catch (err: unknown) {
      console.log(err);
    }
  };

  return (
    <>
      <Heads title="Login" />
      <section className="loginContainer">
        <div className="loginFrame">
          <form onSubmit={signIn}>
            <div className="loginWrap">
              <h1>
                <Link href="/home">
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
        </div>
      </section>

      <style jsx>
        {`
          ul {
            margin: 0;
            padding: 0;
          }

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

          .loginContainer {
            display: flex;
            max-width: 1280px;
            min-height: 100vh;
            justify-content: center;
            align-items: center;
          }

          .loginContainer .loginFrame {
            width: 100%;
            display: flex;
            justify-content: center;
          }

          .loginFrame > form {
            text-align: center;
            max-width: 375px;
            width: 100%;
          }

          .loginWrap {
            display: flex;
            flex-direction: column;
            gap: 2rem;
          }

          .loginWrap h1 {
            text-align: center;
            font-weight: bold;
            font-size: 4rem;
            padding-bottom: 1rem;
          }

          .loginWrap input {
            padding: 1.6rem 2rem;
            border: 1px solid #c9cacc;
            border-radius: 0.4rem;
            font-size: 1.4rem;
            line-height: 2.2rem;
            color: #7d7e80;
            width: calc(100% - 4rem);
          }

          .loginWrap .util {
            display: flex;
            gap: 1rem;
            padding-left: 1rem;
            border-left: 1rem solid #e2e2e2;
            text-align: left;
            font-size: 1.2rem;
            font-weight: 400;
          }

          .loginWrap .util a:hover {
            font-weight: 600;
            color: black;
          }

          article ul {
            font-size: 1.4rem;
            font-weight: 600;
          }

          article ul li button[type="submit"] {
            padding: 1.6rem 0;
            border: 0;
            background-color: #d3d3d3;
            border-radius: 0.4rem;
            font-size: 1.4rem;
            line-height: 2.2rem;
            width: 100%;
            font-weight: 600;
          }

          article ul li button[type="submit"]:hover {
            cursor: pointer;
            background-color: gray;
          }
        `}
      </style>
    </>
  );
};

export default Login;
