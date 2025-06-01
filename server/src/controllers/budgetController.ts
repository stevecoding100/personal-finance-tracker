import { Request, Response } from "express";
import * as budgetModel from "../models/budgetModel";

interface AuthedRequest extends Request {
    user?: { id: number; email: string };
}
export const createBudgetController = async (
    req: AuthedRequest,
    res: Response
) => {
    try {
        const budget = await budgetModel.createBudget({
            ...req.body,
            user_id: req.user!.id,
        });

        res.status(201).json(budget);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const getBudgetsController = async (
    req: AuthedRequest,
    res: Response
) => {
    const userId = req.user!.id;

    try {
        const budgets = await budgetModel.getBudgetsByUser(userId);
        res.status(200).json(budgets);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const updateBudgetController = async (
    req: AuthedRequest,
    res: Response
) => {
    try {
        const updatedBudget = await budgetModel.updateBudget(
            Number(req.params.id),
            req.body
        );
        res.status(200).json(updatedBudget);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const deleteBudgetController = async (
    req: AuthedRequest,
    res: Response
) => {
    try {
        await budgetModel.deleteBudget(Number(req.params.id));
        res.status(200).json({ message: "Budget deleted successfully" });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};
