import Image from "next/image";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Profile from "public/images/profile.png";
import { MessageProps } from "@/types/User";

const MessageFrame = styled.article`
  width: 100%;

  .right {
    text-align: right;
    display: flex-reverse;
    justify-content: right;
  }

  & dl {
    display: flex;
    align-items: center;

    & dt {
      & small {
        display: block;
        font-weight: 600;
        text-align: center;
        font-size: 1.6rem;
      }
    }

    & dd {
      font-size: 1.6rem;
      font-weight: 600;
      margin-left: 1.4rem;
      padding-left: 1rem;
      border-left: 2px solid gray;
    }
  }
`;
// var timestamp = 1607110465663
// var date = new Date(timestamp);
// console.log(date.getTime())
// console.log(date)
const Messages = ({ message }: MessageProps) => {
  const [authUid, setAuthUid] = useState("");

  useEffect(() => {
    setAuthUid(localStorage.getItem("uid"));
  }, []);

  return (
    <MessageFrame>
      <dl className={message.uid === authUid ? "right" : ""}>
        {message.avatar ? (
          <>
            <dt>
              <Image src={Profile} alt="profile" width={48} height={48} />
              <small>{message.name}</small>
            </dt>
          </>
        ) : (
          <dt>이미지가 존재하지 않습니다.</dt>
        )}

        <dd>{message.text}</dd>
      </dl>
    </MessageFrame>
  );
};

export default Messages;
