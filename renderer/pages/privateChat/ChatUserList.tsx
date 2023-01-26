import styled from "styled-components";
import Profile from "public/images/profile.png";
import { ChatUserProps } from "@/types/User";
import Image from "next/image";
import { useContext, useState, useEffect } from "react";
import {
  getDoc,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/pbase";
import { ChatContext } from "@/context/chatContext";

const ChatUsers = styled.section`
  max-width: 60rem;
  width: 100%;
  display: flex;
  gap: 2.4rem;
  justify-content: center;
  margin: 0 auto;
  flex-wrap: wrap;

  & h1 {
    width: 100%;
    text-align: center;
    font-size: 2.4rem;
  }

  & article {
    width: 25%;
    display: flex;
    justify-content: center;

    & ul {
      & li {
        text-align: center;
        font-size: 2rem;
        &:hover {
          cursor: pointer;
          transfrom: scale(1.05);
          transition: scale 0.4s;
        }
      }
    }
  }
`;

const ChatUserList = ({ chatUsers, currentUserInfo }: ChatUserProps) => {
  const [chats, setChats] = useState<string[]>([]);

  const { dispatch } = useContext(ChatContext);

  const chatId = Object.entries(chats);

  useEffect(() => {
    const getChats = () => {
      const userChat = onSnapshot(
        doc(db, "userChats", currentUserInfo.uid),
        doc => {
          setChats(doc.data());
        },
      );

      return () => {
        userChat();
      };
    };

    currentUserInfo.uid && getChats();
  }, [currentUserInfo.uid]);

  const creatChatRoom = async (
    displayName: string,
    userId: string,
    avatar: string | null,
  ) => {
    const combinedId =
      currentUserInfo.uid > userId
        ? currentUserInfo.uid + userId
        : userId + currentUserInfo.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUserInfo.uid), {
          [combinedId + ".userInfo"]: {
            uid: userId,
            displayName: displayName,
            photoURL: avatar,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", userId), {
          [combinedId + ".userInfo"]: {
            uid: currentUserInfo.uid,
            displayName: currentUserInfo.displayName,
            photoURL: currentUserInfo.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }

      dispatch({ type: "CHANGE_USER", payload: chatId[0][1].userInfo });
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return (
    <ChatUsers>
      <h1>1:1 채팅을 원하는 유저를 선택해주세요!!</h1>
      {chatUsers
        .filter(curr => curr.uid !== currentUserInfo.uid)
        .map((tem, idx) => {
          return (
            <article
              key={tem.uid}
              onClick={() => {
                creatChatRoom(tem.name, tem.uid, tem.avatar);
              }}
            >
              <ul>
                {tem.avatar ? (
                  <li>이미지가 존재하지 않습니다.</li>
                ) : (
                  <li>
                    <Image src={Profile} alt="profile" width={48} height={48} />
                  </li>
                )}
                <li>{tem.name}</li>
              </ul>
            </article>
          );
        })}
    </ChatUsers>
  );
};

export default ChatUserList;
