import { Request, Response } from "express";
import * as authService from "../services/authService";

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

    try {
        const result = await authService.loginUser(email, req.body.password);
        const { user, token } = result;

        res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            token,
        });
    } catch (err: any) {
        res.status(401).json({ error: err.message });
    }
};

export const getMeController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const user = await authService.getUser(req.user.id);
        res.status(200).json(user);
    } catch (err: any) {
        res.status(401).json({ error: err.message });
    }
};
