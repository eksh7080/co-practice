import Heads from "@/components/Heads";
import { auth, db } from "@/pbase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, serverTimestamp, doc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";

const SignUpContainer = styled.div`
  display: flex;
  justify-content: center;
  max-width: 128rem;
  text-align: center;
  align-items: center;

  .signupFrame {
    min-width: 36rem;
    & form {
      max-width: 46rem;
      width: 100%;

      & h1 {
        text-align: center;
        font-weight: 900;
        font-size: 4rem;
      }

      & .signWrap {
        margin-top: 2rem;
        & ul {
          & li {
            margin-bottom: 2rem;

            & label {
              display: block;
              text-align: left;
              font-size: 1.4rem;
              font-weight: 600;
              padding-bottom: 1rem;
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

            & button[type="button"] {
              border: 1px none #c9cacc;
              border-radius: 0.4rem;
              font-size: 1.4rem;
              width: 100%;
              line-height: 2.2rem;
              background-color: rgba(0, 0, 0, 0.08);
              padding: 1.6rem 2rem;
              &:hover {
                cursor: pointer;
              }
            }
          }
        }

        & div {
          padding: 2rem 0;

          & button {
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

        await setDoc(doc(db, "userChats", auth.currentUser.uid), {});

        alert("??????????????? ??????????????? ?????????????????????.");
        router.push("/Home");
      }
    } catch (err: unknown) {
      console.log(err);
    }
  };

  return (
    <>
      <Heads title="Signup" />
      <SignUpContainer>
        <div className="signupFrame">
          <form onSubmit={signUp}>
            <h1>
              <Link href="/Home">
                <a>SIGN UP</a>
              </Link>
            </h1>
            <div className="signWrap">
              <ul>
                <li>
                  <label>?????????</label>
                  <input
                    placeholder="?????????"
                    name="nickName"
                    autoComplete="off"
                    required
                    onChange={nickChangeValue}
                  />
                </li>

                <li>
                  <label>?????????</label>
                  <input
                    placeholder="?????????"
                    name="email"
                    autoComplete="off"
                    required
                    onChange={emailChangeValue}
                  />
                </li>

                <li>
                  <label>????????????</label>
                  <input
                    type="password"
                    minLength={6}
                    name="password"
                    maxLength={21}
                    autoComplete="off"
                    placeholder="????????????"
                    required
                    onChange={passwordChangeValue}
                  />
                </li>
              </ul>

              <div className="submitBtn">
                <button type="submit">????????????</button>
              </div>
            </div>
          </form>
        </div>
      </SignUpContainer>
    </>
  );
};

export default Signup;
