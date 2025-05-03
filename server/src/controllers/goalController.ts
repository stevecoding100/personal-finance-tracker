import { Request, Response } from "express";
import * as goalModel from "../models/goalModel";

export const createGoalController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const goal = await goalModel.createGoal({
            ...req.body,
            user_id: req.user!.id,
        });
        res.status(201).json(goal);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const getGoalsController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const goals = await goalModel.getGoalsByUserId(req.user!.id);
        res.status(200).json(goals);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const updateGoalController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const updatedGoal = await goalModel.updateGoal(
            Number(req.params.id),
            req.body
        );
        res.status(200).json(updatedGoal);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const deleteGoalController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const result = await goalModel.deleteGoal(Number(req.params.id));
        res.status(200).json(result);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};
