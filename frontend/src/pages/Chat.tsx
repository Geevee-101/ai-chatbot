import React, { useEffect, useRef, useState } from "react";
import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { red } from "@mui/material/colors";
import ChatItem from "../components/chats/ChatItem";
import { ArrowUpRight } from "lucide-react";
import { fetchUserChats, sendChatRequest } from "../api/chat-api";
import { toast } from "sonner";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export function Chat() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const handleSubmit = async () => {
    if (!inputRef.current?.value) return;

    const newMessage: ChatMessage = {
      role: "user",
      content: inputRef.current.value,
    };

    setChatMessages((prev) => [...prev, newMessage]);
    const chatData = await sendChatRequest(newMessage.content);

    setChatMessages((prev) => [
      ...prev,
      { role: "assistant", content: chatData },
    ]);

    inputRef.current.value = "";
  };

  useEffect(() => {
    const toastId = toast.loading("Loading your chats...");
    fetchUserChats()
      .then((chats) => {
        setChatMessages(chats || []);

        console.log("Fetched chats:", chats);
        console.log("Chat messages state:", chats || []);
        toast.success("Chats loaded successfully");
      })
      .catch((error) => {
        console.error("Failed to fetch chats:", error);
        toast.error("Failed to load chats");
      })
      .finally(() => {
        toast.dismiss(toastId);
      });
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "rgb(17, 29, 39)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: "bold",
            }}
          >
            {auth?.user?.name?.slice(0, 1)}
            {auth?.user?.name?.split(" ")[1]?.slice(0, 1)}
          </Avatar>
          <Typography sx={{ mx: "auto" }}>
            You are talking to a Chatbot
          </Typography>
          <Typography sx={{ mx: "auto", my: 2, p: 3 }}>
            Ask any question you have
          </Typography>
          <Button
            sx={{
              mx: "auto",
              my: "auto",
              width: "200px",
              bgcolor: red[300],
              ":hover": {
                bgcolor: red[400],
              },
              color: "white",
              fontWeight: "bold",
              borderRadius: 3,
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flex: 1, flexDirection: "column", px: 3 }}>
        <Typography
          sx={{ mx: "auto", fontSize: "40px", color: "white", mb: 2 }}
        >
          Model - GPT 4o Mini
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehaviour: "smooth",
          }}
        >
          {chatMessages.map((message, index) => (
            <ChatItem
              key={index}
              role={message.role}
              content={message.content}
            />
          ))}
        </Box>
        <div
          style={{
            width: "100%",
            padding: "20px",
            borderRadius: 8,
            backgroundColor: "rgb(17, 29, 39)",
            display: "flex",
            margin: "auto",
          }}
        >
          {" "}
          <input
            ref={inputRef}
            type="text"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "10px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
            }}
          />
          <IconButton
            onClick={handleSubmit}
            sx={{ ml: "auto", color: "white" }}
          >
            <ArrowUpRight />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
}

export default Chat;
