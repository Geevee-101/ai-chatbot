import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";

export const generateToken = (id: string, email: string, expiresIn: string) => {
  const payload = {
    id,
    email,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn,
  });
  return token;
};

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.signedCookies[`${COOKIE_NAME}`];
    if (!token || token.trim() === "") {
      return res.status(401).json({ message: "Unauthorized, token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;

    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Unauthorized, token invalid" });
    }

    // Store decoded token data for use in route handlers
    res.locals.jwtData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized, token invalid" });
  }
};
