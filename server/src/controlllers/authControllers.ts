import { Request, Response } from "express";
import { createUser, loginUser } from "../services/authService";

export const signup = async (req: Request, res: Response) => {
    try {
        const user = await createUser(req.body);
        res.status(201).json({ message: "User created", user });
    } catch (error) {
        res.status(400).json({ error: "Error creating user" });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const token = await loginUser(req.body);
        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(400).json({ error: "Invalid credentials" });
    }
};
