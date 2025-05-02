// src/services/authService.ts

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db";

export const createUser = async (userData: {
    username: string;
    password: string;
}) => {
    const { username, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
        "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
        [username, hashedPassword]
    );
    return result.rows[0];
};

export const loginUser = async (userData: {
    username: string;
    password: string;
}) => {
    const { username, password } = userData;
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
        username,
    ]);
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
    });
    return token;
};
