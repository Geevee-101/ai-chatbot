import { Router } from "express";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import { generateChatCompletion } from "../controllers/chat-controllers.js";
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
  generateChatCompletion,
);

export default chatRoutes;
