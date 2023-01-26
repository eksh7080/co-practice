import { collection, getDocs } from "firebase/firestore";
import { db } from "@/pbase";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Heads from "@/components/Heads";
import Profile from "public/images/profile.png";
import Image from "next/image";
import { UserData } from "@/types/User";

const ListContainer = styled.section`
  max-width: 60rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  & article {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
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

const UserList = () => {
  const [user, setUser] = useState<UserData[]>([]);
  const userList: UserData = [];

  const getUserInfo = async () => {
    const res = await getDocs(collection(db, "userInfo"));
    res.docs.forEach(list => {
      //   const newData = [];
      //   newData.push([...user, list.data()]);
      //   setUser(...newData);
      userList.push(list.data());
    });
    setUser(userList);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <Heads title="UserList" />

      <ListContainer>
        {user.map(tem => (
          <article key={tem.uid}>
            <ul>
              {tem.avatar ? (
                <li>이미지가 존재하지 않습니다.</li>
              ) : (
                <li>
                  <a>
                    <Image src={Profile} alt="profile" width={48} height={48} />
                  </a>
                </li>
              )}
              <li>{tem.name}</li>
            </ul>
          </article>
        ))}
      </ListContainer>
    </>
  );
};

export default UserList;
