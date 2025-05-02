import dotenv from "dotenv";
dotenv.config();

export const config = {
    app: {
        port: process.env.PORT || 5000,
        nodeEnv: process.env.NODE_ENV || "development",
    },
    db: {
        host: process.env.DB_HOST!,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER!,
        password: process.env.DB_PASSWORD!,
        database: process.env.DB_NAME!,
    },
    jwt: {
        secret: process.env.JWT_SECRET! as string,
        expiresIn: "7d" as const,
    },
};
