import { Request, Response } from "express";
import * as authService from "../services/authService";

export const registerController = async (req: Request, res: Response) => {
    try {
        const result = await authService.registerUser(
            req.body.name,
            req.body.email,
            req.body.password
        );
        res.status(201).json(result);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const loginController = async (req: Request, res: Response) => {
    try {
        const result = await authService.loginUser(
            req.body.email,
            req.body.password
        );
        res.status(200).json(result);
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
