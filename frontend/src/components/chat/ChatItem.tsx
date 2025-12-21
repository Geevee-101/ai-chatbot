import { Avatar, Box, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

export function ChatItem({
  role,
  content,
}: {
  role: "user" | "assistant";
  content: string;
}) {
  const auth = useAuth();
  return role === "user" ? (
    <Box sx={{ display: "flex", p: 2, bgcolor: "#004d56", gap: 2 }}>
      <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
        {auth?.user?.name?.slice(0, 1)}
        {auth?.user?.name?.split(" ")[1].slice(0, 1)}
      </Avatar>
      <Box>
        <Typography fontSize={"20px"}>{content}</Typography>
      </Box>
    </Box>
  ) : (
    <Box sx={{ display: "flex", p: 2, bgcolor: "#004d5612", my: 2, gap: 2 }}>
      <Avatar sx={{ ml: "0" }}>
        <img src="openai.png" alt="openai" width={"30px"} />
      </Avatar>
      <Box>
        <Typography fontSize={"20px"}>{content}</Typography>
      </Box>
    </Box>
  );
}

export default ChatItem;
