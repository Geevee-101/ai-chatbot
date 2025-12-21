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

const chatRoutes = Router();

chatRoutes.post(
  "/new",
  validate(chatCompletionValidator()),
  authenticateToken,
  authenticateUser,
  createChatCompletion,
);

chatRoutes.get(
  "/user-all-chats",
  authenticateToken,
  authenticateUser,
  sendChatsToUser,
);

export default chatRoutes;
