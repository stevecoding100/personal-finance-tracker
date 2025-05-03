import { db } from "../db/db";

export interface Budget {
    id?: number;
    user_id: number;
    category: string;
    amount: number;
    month: string; // Format: "YYYY-MM"
    created_at?: Date;
    updated_at?: Date;
}

export const createBudget = async (budgetData: Budget): Promise<Budget> => {
    const [budget] = await db<Budget>("budgets")
        .insert({
            ...budgetData,
            created_at: new Date(),
            updated_at: new Date(),
        })
        .returning("*");
    return budget;
};

export const getBudgetsByUser = async (userId: number): Promise<Budget[]> => {
    return db<Budget>("budgets").where({ user_id: userId });
};

export const getBudgetById = async (
    id: number
): Promise<Budget | undefined> => {
    return db<Budget>("budgets").where({ id }).first();
};

export const updateBudget = async (
    id: number,
    updates: Partial<Omit<Budget, "id" | "user_id" | "created_at">>
): Promise<Budget> => {
    const [updatedBudget] = await db<Budget>("budgets")
        .where({ id })
        .update({ ...updates, updated_at: new Date() })
        .returning("*");
    return updatedBudget;
};

export const deleteBudget = async (id: number): Promise<number> => {
    return db<Budget>("budgets").where({ id }).del();
};
