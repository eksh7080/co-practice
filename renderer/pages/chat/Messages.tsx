import Image from "next/image";
import { useState, useEffect, useContext, useRef } from "react";
import styled from "styled-components";
import Profile from "public/images/profile.png";
import { MessageProps } from "@/types/User";

const MessageFrame = styled.article`
  width: 100%;
  padding: 1rem 0;
  line-height: 2rem;

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

const Messages = ({ message }: MessageProps) => {
  const [currentId, setCurrentId] = useState("");

  useEffect(() => {
    setCurrentId(localStorage.getItem("uid"));
  }, [currentId]);

  return (
    <MessageFrame>
      <dl className={message.senderId === currentId ? "right" : ""}>
        <dt>
          <Image src={Profile} alt="profile" width={48} height={48} />
          <small>{message.displayName}</small>
        </dt>

        <dd>{message.sendMessageValue}</dd>
      </dl>
    </MessageFrame>
  );
};

export default Messages;
