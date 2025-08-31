import { Request, Response } from "express";
import prisma from "../config/prisma";

export const createGoal = async (req: Request, res: Response) => {
    try {
        const { title, target, deadline } = req.body;
        const userId = (req as any).userId;

        // convert deadline
        let formattedDeadline: Date | null = null;
        if (deadline) {
            // If user passes "2025-12-25", this still works
            formattedDeadline = new Date(deadline);

            // If conversion fails (invalid date)
            if (isNaN(formattedDeadline.getTime())) {
                return res
                    .status(400)
                    .json({ error: "Invalid deadline format" });
            }
        }

        const goal = await prisma.goal.create({
            data: {
                title,
                target,
                deadline: formattedDeadline,
                userId,
            },
        });
        res.json(goal);
    } catch (error) {
        res.status(500).json({ error: "Failed to create goal" });
    }
};

export const getGoals = async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    try {
        const goals = await prisma.goal.findMany({ where: { userId } });
        res.json(goals);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch goals" });
    }
};
