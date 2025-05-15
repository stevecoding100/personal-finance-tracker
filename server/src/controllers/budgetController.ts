import { Request, Response } from "express";
import * as budgetService from "../services/budgetService";

import { getOrSetCache, invalidateCache } from "../utils/cache";

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
        await invalidateCache(`budgets:user:${req.user!.id}`); // Invalidate cache

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
    const cacheKey = `budgets:user:${userId}`;
    try {
        const budgets = await getOrSetCache(cacheKey, 3600, () =>
            budgetService.getBudgetById(userId)
        );
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
        const updatedBudget = await budgetService.updateBudget(
            Number(req.params.id),
            req.body
        );
        await invalidateCache(`budgets:user:${req.user!.id}`); // Invalidate cache
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
        await budgetService.deleteBudget(Number(req.params.id));
        await invalidateCache(`budgets:user:${req.user!.id}`); // Invalidate cache
        res.status(200).json({ message: "Budget deleted successfully" });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};
