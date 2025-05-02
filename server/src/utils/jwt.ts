import jwt from "jsonwebtoken";
import { config } from "../config/config";

export const createToken = (payload: object) => {
    return jwt.sign(payload, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn,
    });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, config.jwt.secret as string);
};
