import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

interface JWTPayload {
    id: number;
    email: string;
    name: string;
}

export const createToken = (payload: JWTPayload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET);
};
