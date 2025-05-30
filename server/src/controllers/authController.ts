import { Request, Response } from "express";
import * as authService from "../services/authService";
import redisClient from "../config/redisClient";

export const registerController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            res.status(400).json({
                error: "Name, email, and password are required.",
            });
            return;
        }
        const result = await authService.registerUser(name, email, password);
        const { user, token } = result;
        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            token,
        });
    } catch (err: any) {
        console.error("Register Error:", err.message);
        res.status(400).json({ error: err.message });
    }
};

export const loginController = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({
            error: "Wrong email or password.",
        });
        return;
    }
    // Adding a Redis check to limit login attempts per IP or email.s
    const ip = req.ip;
    const key = `login_attempts:${ip}:${email}`;

    try {
        const attempts = parseInt((await redisClient.get(key)) || "0");
        if (attempts >= 5) {
            res.status(429).json({
                error: "Too many login attempts. Try again later.",
            });
        }
        const result = await authService.loginUser(email, req.body.password);
        const { user, token } = result;
        // Reset failed attempts on success
        await redisClient.del(key);
        res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            token,
        });
    } catch (err: any) {
        // Increment attempt count on failure
        await redisClient.incr(key);
        await redisClient.expire(key, 60 * 5); // 5 min expiration

        res.status(401).json({ error: err.message });
    }
};

export const getMeController = async (
    req: Request,
    res: Response
): Promise<void> => {
    // Caching the user profile in Redis to reduce DB hits
    try {
        if (!req.user) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const cacheKey = `user:${req.user.id}`;
        const cached = await redisClient.get(cacheKey);

        if (cached) {
            res.status(200).json(JSON.parse(cached));
        }

        const user = await authService.getUser(req.user.id);
        await redisClient.set(cacheKey, JSON.stringify(user), { EX: 3600 }); // cache for 1hr

        res.status(200).json(user);
    } catch (err: any) {
        res.status(401).json({ error: err.message });
    }
};
