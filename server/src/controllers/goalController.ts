import { Request, Response } from "express";
import * as goalModel from "../models/goalModel";

import { getOrSetCache, invalidateCache } from "../utils/cache";

export const createGoalController = async (req: Request, res: Response) => {
    try {
        const goal = await goalModel.createGoal({
            ...req.body,
            user_id: req.user!.id,
        });
        await invalidateCache(`goals:user:${req.user!.id}`); // Invalidate cache
        res.status(201).json(goal);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const getGoalsController = async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const cacheKey = `goals:user:${userId}`;
    try {
        const goals = await getOrSetCache(cacheKey, 3600, () =>
            goalModel.getGoalsByUserId(userId)
        );
        res.status(200).json(goals);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};
export const getGoalController = async (req: Request, res: Response) => {
    try {
        const goal = await goalModel.getGoalById(Number(req.params.id));
        res.status(200).json(goal);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};
export const updateGoalController = async (req: Request, res: Response) => {
    try {
        const updatedGoal = await goalModel.updateGoal(
            Number(req.params.id),
            req.body
        );
        await invalidateCache(`goals:user:${req.user!.id}`); // Invalidate cache
        res.status(200).json(updatedGoal);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const deleteGoalController = async (req: Request, res: Response) => {
    try {
        const result = await goalModel.deleteGoal(Number(req.params.id));
        await invalidateCache(`goals:user:${req.user!.id}`); // Invalidate cache
        res.status(200).json(result);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};
