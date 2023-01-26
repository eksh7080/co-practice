import { useState, useEffect, useContext } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/pbase";
import ChatUserList from "./chatUserList";
import { UserData } from "@/types/User";
import styled from "styled-components";
import { CurrentUser } from "@/types/User";
import ChatBox from "../chat/ChatBox";
import { ChatContext } from "@/context/chatContext";

const PrivateChatContainer = styled.section`
  max-width: 128rem;
`;

const PrivateChatHome = () => {
  const [chatUsers, setChatUsers] = useState<UserData[]>([]);
  const [currentUserInfo, setCurrentUserInfo] = useState<CurrentUser>({
    uid: "",
    photoURL: "" | null,
    displayName: "",
  });
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const PropUserList = onSnapshot(collection(db, "userInfo"), user => {
      setChatUsers(user.docs.map(doc => doc.data()));
    });

    setCurrentUserInfo({
      uid: localStorage.getItem("uid"),
      photoURL: localStorage.getItem("photo"),
      displayName: localStorage.getItem("display"),
    });
  }, []);

  return (
    <PrivateChatContainer>
      <ChatUserList chatUsers={chatUsers} currentUserInfo={currentUserInfo} />
      {data.chatId !== data.chatId || data.chatId === "null" ? "" : <ChatBox />}
    </PrivateChatContainer>
  );
};

export default PrivateChatHome;
