import React, { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { auth, db } from "@/pbase";
import Message from "./Message";
import SendMessage from "./SendMessage";

interface UserData {
  avatar: string | null;
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
  name: string;
  uid: string;
  id: string;
  text: string;
}

const ChatBox = () => {
  const [extractMessage, setExtractMessage] = useState<UserData[]>([]);
  const scroll = useRef();

  useEffect(() => {
    const dbMessages = query(
      collection(db, "messages"),
      orderBy("createdAt"),
      limit(50),
    );
    console.log(dbMessages, "query query query query query");

    const unsubscribe = onSnapshot(dbMessages, querySnapshot => {
      let messageDatas = [];
      querySnapshot.forEach(msg => {
        messageDatas.push({ ...msg.data(), id: msg.id });
      });
      setExtractMessage(messageDatas);
    });

    return () => unsubscribe;
  }, []);

  console.log(extractMessage);

  return (
    <main className="chat-box">
      {/* <div className="messages-wrapper">
        {extractMessage?.map(message => (
          <Message key={message.id} message={extractMessage} />
        ))}
      </div> */}
      {/* when a new message enters the chat, the screen scrolls dowwn to the scroll div */}
      {/* <span ref={scroll}></span> */}
      <SendMessage
      //  scroll={scroll}
      />
    </main>
  );
};

export default ChatBox;
