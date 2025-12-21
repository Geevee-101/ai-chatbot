import axios from "../lib/axios";

export const sendChatRequest = async (message: string) => {
  const res = await axios.post("/chat/new", { message });
  if (res.status !== 200) {
    throw new Error("Unaable to send message");
  }
  const data = res.data;
  return data;
};

export const getUserAllChats = async () => {
  const res = await axios.get("/chat/user-all-chats");
  if (res.status !== 200) {
    throw new Error("Unaable to send message");
  }
  const data = res.data;
  return data;
};
