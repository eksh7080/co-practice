import { collection, getDocs } from "firebase/firestore";
import { db } from "@/pbase";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Heads from "@/components/Heads";

interface UserData {
  avatar: string | null;
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
  name: string;
  uid: string;
}

const ListContainer = styled.section`
  max-width: 1280px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserList = () => {
  const [user, setUser] = useState<UserData[]>([]);
  const userList: UserData = [];
  const users = async () => {
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
    users();
  }, []);

  return (
    <ListContainer>
      <Heads title="UserList" />
      {user.map(tem => (
        <article key={tem.uid}>
          <ul>
            <li>{tem.name}</li>
          </ul>
        </article>
      ))}
    </ListContainer>
  );
};

export default UserList;
