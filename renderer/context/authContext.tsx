import { createContext, useReducer, useContext } from "react";

interface UserAuth {
  token: string | null;
  uid: string | null;
}

const initialState: UserAuth = {
  token: "",
  uid: "",
};

function userReducer(state, action) {
  switch (action.type) {
    case "token":
      return {
        ...state,
        token: action.payload.token,
      };
  }
}

const AuthContext = createContext("");
const AuthDispatchContext = createContext("");

export function AuthProvider({ children }) {
  const [user, dispatch] = useReducer(userReducer, initialState);
  return (
    <AuthContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
}

export function useUserState() {
  return useContext(AuthContext);
}

export function useUserDispatch() {
  return useContext(AuthDispatchContext);
}
