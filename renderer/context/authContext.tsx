import { createContext, useState, useEffect } from "react";
import { AuthContextType } from "@/types/User";
import { useRouter } from "next/router";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userContextAuth, setUserContextAuth] = useState<AuthContextType>({
    uid: "",
    token: "",
    photo: "" | null,
    display: "" | null,
  });

  const [userValue, setUserValue] = useState();
  const router = useRouter();

  useEffect(() => {
    const authContext = () => {
      setUserContextAuth({
        uid: localStorage.getItem("uid"),
        token: localStorage.getItem("token"),
        photo: localStorage.getItem("photo"),
        display: localStorage.getItem("display"),
      });
    };
    return () => authContext();
  }, [router.pathname]);

  return (
    <AuthContext.Provider value={{ userContextAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
