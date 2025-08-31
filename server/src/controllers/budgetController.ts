import { Request, Response } from "express";
import prisma from "../config/prisma";

export const createBudget = async (req: Request, res: Response) => {
    try {
        const { category, limit, startDate, endDate } = req.body;
        const userId = (req as any).userId;

        // Validate required fields
        if (!category || !limit || !startDate || !endDate) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        // Convert dates individually
        const formattedStartDate = new Date(startDate);
        const formattedEndDate = new Date(endDate);

        if (
            isNaN(formattedStartDate.getTime()) ||
            isNaN(formattedEndDate.getTime())
        ) {
            return res.status(400).json({ error: "Invalid date format" });
        }

        const budget = await prisma.budget.create({
            data: {
                category,
                limit,
                startDate: formattedStartDate,
                endDate: formattedEndDate,
                userId,
            },
        });

        res.json(budget);
    } catch (error) {
        res.status(500).json({ error: "Failed to create budget" });
    }
};

export const getBudgets = async (req: Request, res: Response) => {
    const userId = (req as any).userId;

    try {
        const budgets = await prisma.budget.findMany({ where: { userId } });
        res.json(budgets);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch budgets" });
    }
};
