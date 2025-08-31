import { Request, Response } from "express";
import prisma from "../config/prisma";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser)
            return res.status(400).json({ error: "Email already in use" });

        const passwordHash = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { name, email, passwordHash },
        });

        const token = generateToken(user.id);
        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ error: "Resgistration failed" });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(400).json({ error: "Invalid email" });

        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid)
            return res.status(400).json({ error: "Invalid password" });

        const token = generateToken(user.id);
        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
};
