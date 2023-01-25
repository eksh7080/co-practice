import styled from "styled-components";
import Profile from "public/images/profile.png";
import { ChatUserProps } from "@/types/User";
import Image from "next/image";
import { useRouter } from "next/router";

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

const ChatUserList = ({
  chatUsers,
  currentId,
  setChatUserRecive,
}: ChatUserProps) => {
  const router = useRouter();

  const handleToggle = (displayName, uid) => {
    setChatUserRecive({
      displayName: displayName,
      uid: uid,
    });
    router.push(`/privateChat/${uid}`);
  };

  return (
    <ChatUsers>
      <h1>1:1 채팅을 원하는 유저를 선택해주세요!!</h1>
      {chatUsers
        .filter(curr => curr.uid !== currentId)
        .map((tem, idx) => {
          return (
            <article
              key={tem.uid}
              onClick={() => {
                handleToggle(tem.name, tem.uid);
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
