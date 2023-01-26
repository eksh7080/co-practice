import React, {
  ChangeEvent,
  FormEvent,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth, db } from "@/pbase";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
  arrayUnion,
  Timestamp,
} from "firebase/firestore";
import styled from "styled-components";
import { CurrentUser } from "@/types/User";
import { v4 as uuid } from "uuid";
import { ChatContext } from "@/context/chatContext";

const SubmitForm = styled.form`
  max-width: 80rem;
  padding: 2rem 0;

  & input[type="text"] {
    padding: 1rem;
    border: 1px solid #b0e0e6;
    width: calc(100% - 10rem);
    border-radius: 0.4rem;
  }

  & button[type="submit"] {
    background: none;
    border: 1px solid #b0e0e6;
    padding: 1rem;
    margin-left: 0.4rem;
    width: calc(10%);
    border-radius: 0.4rem;

    &:hover {
      cursor: pointer;
    }
  }
`;

const SendMessage = () => {
  const [currentUserInfo, setCurrentUserInfo] = useState<CurrentUser>({
    displayName: "",
    photoURL: null,
    uid: "",
  });
  const [sendMessageValue, setSendMessageValue] = useState("");

  const { data } = useContext(ChatContext);

  useEffect(() => {
    setCurrentUserInfo({
      ...currentUserInfo,
      displayName: localStorage.getItem("display"),
      photoURL: localStorage.getItem("photo"),
      uid: localStorage.getItem("uid"),
    });
  }, []);

  const changeMsgValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSendMessageValue(e.target.value);
  };

  const privateSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentUserInfo.uid) {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          sendMessageValue,
          senderId: currentUserInfo.uid,
          displayName: currentUserInfo.displayName,
          data: Timestamp.now(),
        }),
      });
    }
    setSendMessageValue("");
  };

  return (
    <SubmitForm onSubmit={privateSendMessage}>
      <label htmlFor="writeMessage" hidden>
        Enter Message
      </label>
      <input
        id="writeMessage"
        name="writeMessage"
        type="text"
        value={sendMessageValue}
        placeholder="메세지 입력"
        onChange={changeMsgValue}
      />
      <button type="submit">전송</button>
    </SubmitForm>
  );
};

export default SendMessage;
