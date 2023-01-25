import { useRouter } from "next/router";

const PrivateRoom = () => {
  const router = useRouter();
  console.log(router, "asdasd");
  //   const [title, id] = params || [];

  return (
    <div>
      <h1>이게 된다고?</h1>
    </div>
  );
};

export default PrivateRoom;
