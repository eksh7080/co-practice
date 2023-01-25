import React, { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { auth, db } from "@/pbase";
import Message from "./Messages";
import SendMessage from "./SendMessage";
import { MessageData } from "@/types/User";
import styled from "styled-components";

const ChatContainer = styled.section`
  max-width: 60rem;
  display: flex;
  flex-direction: column;
  width: 100%;

  &.chatFrame {
    border: 1px solid #000;
  }
`;

const ChatBox = () => {
  const [extractMessage, setExtractMessage] = useState<MessageData[]>([]);
  const scroll = useRef();

  useEffect(() => {
    const dbMessages = query(
      collection(db, "messages"),
      orderBy("createdAt"),
      limit(50),
    );

    const unsubscribe = onSnapshot(dbMessages, querySnapshot => {
      let messageDatas = [];
      querySnapshot.forEach(msg => {
        messageDatas.push({ ...msg.data(), id: msg.id });
      });
      setExtractMessage(messageDatas);
    });

    return () => unsubscribe;
  }, []);

  console.log(extractMessage, "chat box chat box");

  return (
    <ChatContainer>
      <div className="chatFrame">
        {extractMessage.map(message => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      {/* when a new message enters the chat, the screen scrolls dowwn to the scroll div */}
      {/* <span ref={scroll}></span> */}
      <SendMessage
      //  scroll={scroll}
      />
    </ChatContainer>
  );
};

export default ChatBox;
