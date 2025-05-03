import { Request, Response } from "express";
import * as budgetService from "../services/budgetService";

interface AuthedRequest extends Request {
    user?: { id: number; email: string };
}
export const createBudgetController = async (
    req: AuthedRequest,
    res: Response
) => {
    try {
        const budget = await budgetService.createBudget({
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
    try {
        const budgets = await budgetService.getBudgetsByUser(req.user!.id);
        res.status(200).json(budgets);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};
