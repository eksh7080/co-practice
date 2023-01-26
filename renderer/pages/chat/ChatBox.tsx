import React, { useEffect, useState, useContext } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { auth, db } from "@/pbase";
import { ChatContext } from "@/context/chatContext";
import styled from "styled-components";
import Message from "./Messages";
import SendMessage from "./SendMessage";

const ChatContainer = styled.section`
  max-width: 80rem;
  display: flex;
  justify-content: center;
  border: 1px solid #000;
  margin: 2rem auto 1rem;
  min-height: 40rem;

  & .chatFrame {
    width: 100%;
    padding: 4rem;

    & h1 {
      font-size: 2.4rem;
      border-bottom: 1px solid lightblue;
      margin-bottom: 1rem;
      padding-bottom: 0.4rem;
    }

    & .messageFrame {
      height: 50rem;
      overflow-y: scroll;
    }
  }
`;

const ChatBox = () => {
  const [allMessages, setAllMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const getMessage = onSnapshot(doc(db, "chats", data.chatId), doc => {
      doc.exists() && setAllMessages(doc.data().messages);
    });

    return () => {
      getMessage();
    };
  }, [data.chatId]);

  return (
    <ChatContainer>
      <div className="chatFrame">
        <h1>{data.user.displayName}님과 채팅중입니다.</h1>
        <div className="messageFrame">
          {allMessages.map(msg => (
            <Message message={msg} key={msg.id} />
          ))}
        </div>
        <SendMessage />
      </div>
    </ChatContainer>
  );
};

export default ChatBox;
