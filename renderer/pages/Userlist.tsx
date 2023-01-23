import { collection, getDocs } from "firebase/firestore";
import { db } from "@/pbase";
import { useState, useEffect } from "react";

const UserList = () => {
  const [user, setUser] = useState<string[]>([]);
  const users = async () => {
    const res = await getDocs(collection(db, "userInfo"));
    console.log(res);
  };
  users();

  return <div></div>;
};

export default UserList;
