import {
  createContext,
  useReducer,
  useContext,
  useState,
  useEffect,
} from "react";
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

// const AuthDispatchContext = createContext("");

// interface UserAuth {
//   token: string | null;
//   uid: string | null;
// }

// const initialState: UserAuth = {
//   token: "",
//   uid: "",
// };

// function userReducer(state, action) {
//   switch (action.type) {
//     case "token":
//       return {
//         ...state,
//         token: action.payload.token,
//       };
//   }
// }

// export function AuthProvider({ children }) {
//   const [user, dispatch] = useReducer(userReducer, initialState);
//   return (
//     <AuthContext.Provider value={user}>
//       <AuthDispatchContext.Provider value={dispatch}>
//         {children}
//       </AuthDispatchContext.Provider>
//     </AuthContext.Provider>
//   );
// }

// export function useUserState() {
//   return useContext(AuthContext);
// }

// export function useUserDispatch() {
//   return useContext(AuthDispatchContext);
// }
