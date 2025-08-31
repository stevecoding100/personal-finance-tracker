import { Request, Response } from "express";
import prisma from "../config/prisma";

export const createTransaction = async (req: Request, res: Response) => {
    const { amount, type, category, note } = req.body;
    const userId = (req as any).userId;

    try {
        const transaction = await prisma.transaction.create({
            data: { amount, type, category, note, userId },
        });
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ error: "Failed to create transaction" });
    }
};

export const getTransactions = async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    try {
        const transactions = await prisma.transaction.findMany({
            where: { userId },
        });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch transactions" });
    }
};
