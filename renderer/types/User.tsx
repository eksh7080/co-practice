import { SetStateAction } from "react";

export interface MessageData {
  avatar: string | null;
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
  name: string;
  uid: string;
  id: string;
  text: string;
}

export interface UserAuth {
  token: string | null;
}

export interface CurrentUser {
  displayName: string | null;
  photoURL: string | null;
  uid: string | null;
}

export interface UserData {
  avatar: string | null;
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
  name: string;
  uid: string;
}

export interface MessageProps {
  avatar: string | null;
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
  name: string;
  uid: string;
  id: string;
  text: string;
}

export interface SetChatProps {
  displayName: string;
  uid: string;
}

export interface UserData extends ChatUserProps {
  chatUsers: UserData;
  currentId: string;
  setReceiverData: Dispatch<SetStateAction>;
}
