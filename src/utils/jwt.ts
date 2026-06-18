import jwt from "jsonwebtoken";
import { JWTPayload } from "../modules/auth/auth.type";
import { JWT_SECRET } from "../config/env";

const JWT_EXPIRATION = "7d";

export function generateToken(payload: JWTPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}

export function decodeToken(token: string) {
  return jwt.decode(token);
}
