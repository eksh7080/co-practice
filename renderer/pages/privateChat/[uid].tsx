import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/authContext";
import SendMessage from "../chat/SendMessage";
import { auth, db } from "@/pbase";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
} from "firebase/firestore";

const PrivateRoom = () => {
  const router = useRouter();
  const { userContextAuth } = useContext(AuthContext);
  const currentUserId = userContextAuth.uid;
  const [messageValue, setMessageValue] = useState("");
  const [chatUserRecive, setChatUserRecive] = useState<SetChatProps>({
    uid: "",
    displayName: "",
  });

  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    const { uid, displayName } = router.query;
    console.log(uid, displayName, "dddddddddddddd");
    setChatUserRecive({
      uid: uid,
      displayName: displayName,
    });
  }, []);

  console.log(currentUserId, "ididididididididi", chatUserRecive);

  // useEffect(() => {
  //   if (chatUserRecive.uid && chatUserRecive.displayName) {
  //     const unsub = onSnapshot(
  //       query(
  //         collection(
  //           db,
  //           "userInfo",
  //           currentUserId,
  //           "chatUserMessage",
  //           chatUserRecive.uid,
  //           "messages",
  //         ),
  //         orderBy("createdAt"),
  //       ),
  //       chat => {
  //         const res = [];
  //         res.push(chat.docs.map(doc => doc));
  //         console.log(res, "resres");

  //         // setAllMessages(
  //         //   snapshot.docs.map(doc => ({
  //         //     id: doc.id,
  //         //     messages: doc.data(),
  //         //   })),
  //         // );
  //       },
  //     );
  //   }
  // }, [chatUserRecive.uid]);

  const privateSendMessage = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (messageValue.trim() === "") {
      alert("메세지를 입력해주세요.");
      return;
    }
    try {
      if (currentUserId && chatUserRecive.uid) {
        await addDoc(
          collection(
            db,
            "userInfo",
            currentUserId,
            "chatUserMessage",
            chatUserRecive.uid,
            "messages",
          ),
          {
            name: currentUserId.displayName,
            messageUserId: currentUserId.uid,
            message: messageValue,
            createdAt: new Date(),
          },
        );

        await addDoc(
          collection(
            db,
            "userInfo",
            chatUserRecive.uid,
            "chatUserMessage",
            currentUserId,
            "messages",
          ),
          {
            name: currentUserId.displayName,
            messageUserId: currentUserId.uid,
            message: messageValue,
            createdAt: new Date(),
          },
        );
      }
    } catch (error: unknown) {
      console.log(error);
    }
    setMessageValue("");
  };

  return (
    <SendMessage
      privateSendMessage={privateSendMessage}
      setMessageValue={setMessageValue}
    />
  );
};

export default PrivateRoom;
