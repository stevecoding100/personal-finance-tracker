import * as budgetModel from "../models/budgetModel";
import { Budget } from "../models/budgetModel";

// Create a new budget
export const createBudget = async (
    budgetData: Omit<Budget, "id" | "created_at" | "updated_at">
) => {
    return await budgetModel.createBudget(budgetData);
};

// Get all budgets for a user
export const getBudgetsByUser = async (userId: number) => {
    return await budgetModel.getBudgetsByUser(userId);
};

// Get a single budget by ID (optional if used in future)
export const getBudgetById = async (id: number) => {
    return await budgetModel.getBudgetById(id);
};

// Update a budget
export const updateBudget = async (
    id: number,
    updates: Partial<Omit<Budget, "id" | "user_id" | "created_at">>
) => {
    return await budgetModel.updateBudget(id, updates);
};

// Delete a budget
export const deleteBudget = async (id: number) => {
    return await budgetModel.deleteBudget(id);
};
