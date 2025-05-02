import { Pool } from "pg";

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});

export const connectDB = async () => {
    try {
        await pool.connect();
        console.log("Connected to the database");
    } catch (err) {
        console.error("Failed to connect to the database", err);
    }
};

export default pool;
