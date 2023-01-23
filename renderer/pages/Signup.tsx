import Heads from "@/components/Heads";
import { auth, db } from "@/pbase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, serverTimestamp, doc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Signup = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickName, setNickName] = useState("");

  const emailChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const passwordChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const nickChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };

  const signUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      if (user) {
        updateProfile(auth.currentUser, { displayName: nickName });
        setDoc(doc(db, "userInfo", auth.currentUser.uid), {
          name: nickName,
          avatar: auth.currentUser.photoURL,
          createdAt: serverTimestamp(),
          uid: auth.currentUser.uid,
        });
        alert("회원가입이 성공적으로 완료되었습니다.");
        router.push("/home");
      }
    } catch (err: unknown) {
      console.log(err);
    }
  };

  return (
    <>
      <Heads title="Signup" />
      <section className="signupContainer">
        <div className="signupFrame">
          <form onSubmit={signUp}>
            <h1>
              <Link href="/home">
                <a>SIGN UP</a>
              </Link>
            </h1>
            <div className="signWrap">
              <ul>
                <li>
                  <label>닉네임</label>
                  <input
                    placeholder="닉에임"
                    name="nickName"
                    autoComplete="off"
                    required
                    onChange={nickChangeValue}
                  />
                </li>

                <li>
                  <label>이메일</label>
                  <input
                    placeholder="이메일"
                    name="email"
                    autoComplete="off"
                    required
                    onChange={emailChangeValue}
                  />
                </li>

                <li>
                  <label>비밀번호</label>
                  <input
                    type="password"
                    minLength={6}
                    name="password"
                    maxLength={21}
                    autoComplete="off"
                    placeholder="비밀번호"
                    required
                    onChange={passwordChangeValue}
                  />
                </li>
              </ul>

              <div className="submitBtn">
                <button type="submit">회원가입</button>
              </div>
            </div>
          </form>
        </div>
      </section>

      <style jsx>
        {`
          a,
          a:visited,
          a:link,
          a:active {
            color: #000;
            text-decoration: none;
          }

          ul {
            margin: 0;
            padding: 0;
          }

          ul,
          li {
            list-style: none;
          }

          .signupContainer {
            display: flex;
            flex-direction: row;
            min-height: 100vh;
            max-width: 1280px;
          }

          .signupContainer .signupFrame {
            display: flex;
            width: 100%;
            flex-direction: column;
            justify-content: center;
            text-align: center;
            align-items: center;
          }

          .signupFrame > form {
            max-width: 375px;
            width: 100%;
          }

          .signupFrame > form > h1 {
            text-align: center;
            font-weight: 900;
            font-size: 4rem;
          }

          .signWrap ul li label {
            display: block;
            text-align: left;
            font-size: 1.4rem;
            font-weight: 600;
            padding-top: 1rem;
          }

          .signWrap ul li input {
            padding: 1.6rem 2rem;
            border: 1px solid #c9cacc;
            border-radius: 0.4rem;
            font-size: 1.4rem;
            line-height: 2.2rem;
            color: #7d7e80;
            width: calc(100% - 4rem);
          }

          .signWrap ul li button[type="button"] {
            border: 1px none #c9cacc;
            border-radius: 0.4rem;
            font-size: 1.4rem;
            width: 100%;
            line-height: 2.2rem;
            background-color: rgba(0, 0, 0, 0.08);
            padding: 1.6rem 2rem;
          }

          .signWrap ul li button[type="button"]:hover {
            cursor: pointer;
          }

          .submitBtn {
            padding: 2rem 0;
          }

          .submitBtn button {
            padding: 1.6rem 2rem;
            border: 0;
            background-color: #d3d3d3;
            border-radius: 0.4rem;
            font-size: 1.4rem;
            line-height: 2.2rem;
            width: 100%;
            font-weight: 600;
            cursor: pointer;
          }
        `}
      </style>
    </>
  );
};

export default Signup;
