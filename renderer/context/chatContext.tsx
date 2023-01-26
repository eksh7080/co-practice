import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const [currentId, setCurrentId] = useState("");

  useEffect(() => {
    setCurrentId(localStorage.getItem("uid"));
  }, []);

  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentId > action.payload.uid
              ? currentId + action.payload.uid
              : action.payload.uid + currentId,
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
