import jwt from "jsonwebtoken";
import { config } from "../config/config";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const createToken = (payload: { id: number; email: string }) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, config.jwt.secret as string);
};
