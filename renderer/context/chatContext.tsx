import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

enum TypeDis {
  CHANGE_USER = "CHANGE_USER",
}

interface DispatchType {
  type: TypeDis;
  payload: {
    uid?: string;
    displayName?: string;
    photoURL?: string | null;
  };
}

interface StateType {
  chatId: string | null;
  user: {
    chatId: string | null;
    user: {
      uid?: string;
      displayName?: string;
      photoURL?: string | null;
    };
  };
}

export const ChatContext = createContext();
export const ChatContextProvider = ({ children }) => {
  const [currentId, setCurrentId] = useState("");

  useEffect(() => {
    setCurrentId(localStorage.getItem("uid"));
  }, []);

  const INITIAL_STATE = {
    chatId: "null",
    user: {
      uid: "",
      displayName: "",
      photoURL: "" | null,
    },
  };

  const chatReducer = (state: any, action: any): any => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          chatId:
            currentId > action.payload.uid
              ? currentId + action.payload.uid
              : action.payload.uid + currentId,
          user: action.payload,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
