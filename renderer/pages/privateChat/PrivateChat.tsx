import { useState, useEffect } from "react";
import { auth, db } from "@/pbase";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";
import ChatUserList from "./chatUserList";
import { UserData, SetChatProps } from "@/types/User";
import styled from "styled-components";
import { useRouter } from "next/router";
import SendMessage from "../chat/SendMessage";

const PrivateChatContainer = styled.section`
  max-width: 128rem;
`;

const PrivateChat = () => {
  const router = useRouter();
  const [chatUsers, setChatUsers] = useState<UserData[]>([]);
  const [chatUserRecive, setChatUserRecive] = useState<SetChatProps>({
    uid: "",
    displayName: "",
  });
  const [currentId, setCurrentId] = useState("");

  const [chatMessage, setChatMessage] = useState("");

  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    const PropUserList = onSnapshot(collection(db, "userInfo"), user => {
      setChatUsers(user.docs.map(doc => doc.data()));
    });

    setCurrentId(localStorage.getItem("uid"));
  }, []);
  console.log(chatUserRecive, "reciver reciver");

  useEffect(() => {
    if (chatUserRecive) {
      const unsub = onSnapshot(
        query(
          collection(
            db,
            "userInfo",
            currentId,
            "chatUsers",
            chatUserRecive.uid,
            "messages",
          ),
          orderBy("timestamp"),
        ),
        chat => {
          const res = [];
          res.push(chat.docs.map(doc => doc));
          console.log(res);

          // setAllMessages(
          //   snapshot.docs.map(doc => ({
          //     id: doc.id,
          //     messages: doc.data(),
          //   })),
          // );
        },
      );
    }
  }, [chatUserRecive.uid]);

  // const sendMessage = async () => {
  //   try {
  //     if (user && receiverData) {
  //       await addDoc(
  //         collection(
  //           db,
  //           "users",
  //           user.uid,
  //           "chatUsers",
  //           receiverData.userId,
  //           "messages",
  //         ),
  //         {
  //           username: user.displayName,
  //           messageUserId: user.uid,
  //           message: chatMessage,
  //           timestamp: new Date(),
  //         },
  //       );

  //       await addDoc(
  //         collection(
  //           db,
  //           "users",
  //           receiverData.userId,
  //           "chatUsers",
  //           user.uid,
  //           "messages",
  //         ),
  //         {
  //           username: user.displayName,
  //           messageUserId: user.uid,
  //           message: chatMessage,
  //           timestamp: new Date(),
  //         },
  //       );
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setChatMessage("");
  // };

  return (
    <PrivateChatContainer>
      <ChatUserList
        chatUsers={chatUsers}
        currentId={currentId}
        setChatUserRecive={setChatUserRecive}
      />

      {router.pathname === "" ? "" : <SendMessage />}
    </PrivateChatContainer>
  );
};

// export async function getServerSideProps() {
//   const PropUserList = onSnapshot(collection(db, "userInfo"), user => {
//     user.docs.map(doc => doc.data());
//   });

//   return {
//     props: {
//       PropUserList,
//     },
//   };
// }

export default PrivateChat;
