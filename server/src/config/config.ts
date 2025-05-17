const dotenv = require("dotenv");
dotenv.config();

export const config = {
    app: {
        port: process.env.PORT,
        nodeEnv: process.env.NODE_ENV,
    },
    db: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
};
