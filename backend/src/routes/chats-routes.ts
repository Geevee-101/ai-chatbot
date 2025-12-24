import { Router } from "express";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import {
  createChatCompletion,
  sendChatsToUser,
} from "../controllers/chat-controllers.js";
import {
  authenticateToken,
  authenticateUser,
} from "../middleware/auth-middleware.js";

const chatsRoutes = Router();

chatsRoutes.post(
  "/new",
  validate(chatCompletionValidator()),
  authenticateToken,
  authenticateUser,
  createChatCompletion,
);

chatsRoutes.get("/", authenticateToken, authenticateUser, sendChatsToUser);

export default chatsRoutes;
