import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export const generateToken = (userId: string) => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
};

export const verifyToken = (token: string): { userId: string } => {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded === "string" || !("userId" in decoded)) {
        throw new Error("Invalid token");
    }

    return decoded as { userId: string };
};
