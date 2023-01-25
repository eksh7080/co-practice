import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { auth, db } from "@/pbase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import styled from "styled-components";
import { CurrentUser } from "@/types/User";

const SubmitForm = styled.form`
  border: 1px solid black;
  max-width: 128rem;
  padding: 2rem;

  & input[type="text"] {
    padding: 1rem;
    border: 1px solid #b0e0e6;
  }

  & button[type="submit"] {
    background: none;
    border: 1px solid #b0e0e6;
    padding: 1rem;
    margin-left: 0.4rem;

    &:hover {
      cursor: pointer;
    }
  }
`;

const SendMessage = ({ scroll }) => {
  const [messageValue, setMessageValue] = useState("");
  const [currentUserInfo, setCurrentUserInfo] = useState<CurrentUser>({
    displayName: "" | null,
    photoURL: "" | null,
    uid: "" | null,
  });

  useEffect(() => {
    setCurrentUserInfo({
      ...currentUserInfo,
      displayName: localStorage.getItem("display"),
      photoURL: localStorage.getItem("photo"),
      uid: localStorage.getItem("uid"),
    });
  }, []);

  const changeMsgValue = (e: ChangeEvent<HTMLInputElement>) => {
    setMessageValue(e.target.value);
  };

  const sendMessage = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (messageValue.trim() === "") {
      alert("메세지를 입력해주세요.");
      return;
    }

    // const { uid, displayName, photoURL } = auth.currentUser;

    await addDoc(collection(db, "messages"), {
      text: messageValue,
      name: currentUserInfo.displayName,
      avatar: currentUserInfo.photoURL,
      createdAt: serverTimestamp(),
      uid: currentUserInfo.uid,
    });
    setMessageValue("");
    // scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <SubmitForm onSubmit={sendMessage}>
      <label htmlFor="writeMessage" hidden>
        Enter Message
      </label>
      <input
        id="writeMessage"
        name="writeMessage"
        type="text"
        placeholder="메세지 입력"
        value={messageValue}
        onChange={changeMsgValue}
      />
      <button type="submit">전송</button>
    </SubmitForm>
  );
};

export default SendMessage;
