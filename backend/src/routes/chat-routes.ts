import { Router } from "express";
import { authenticateToken } from "../utils/token-manager.js";

const chatRoutes = Router();

chatRoutes.post("/new", authenticateToken);

export default chatRoutes;
