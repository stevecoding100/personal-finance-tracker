import * as budgetModel from "../models/budgetModel";
import { Budget } from "../models/budgetModel";

export const createBudget = async (budgetData: Budget) => {
    return await budgetModel.createBudget(budgetData);
};

export const getBudgetsByUser = async (userId: number) => {
    return await budgetModel.getBudgetsByUser(userId);
};

export const getBudgetById = async (id: number) => {
    return await budgetModel.getBudgetById(id);
};

export const updateBudget = async (
    id: number,
    updates: Partial<Omit<Budget, "id" | "user_id" | "created_at">>
) => {
    return await budgetModel.updateBudget(id, updates);
};

export const deleteBudget = async (id: number) => {
    return await budgetModel.deleteBudget(id);
};
