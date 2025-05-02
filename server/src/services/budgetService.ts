import { db } from "../db/db";

interface Budget {
    id?: number;
    user_id: number;
    category: string;
    amount: number;
    month: string; // e.g. "2025-05"
    created_at?: Date;
    updated_at?: Date;
}
export const createBudget = async (budgetData: Budget) => {
    const [budget] = await db<Budget>("budgets")
        .insert({
            ...budgetData,
            created_at: new Date(),
            updated_at: new Date(),
        })
        .returning("*");
    return budget;
};

export const getBudgetsByUser = async (userId: number) => {
    return db<Budget>("budgets").where({ user_id: userId });
};
