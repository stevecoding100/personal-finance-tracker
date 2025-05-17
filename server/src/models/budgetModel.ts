import { db } from "../db/db";

export interface Budget {
    id: number;
    user_id: number;
    category: string;
    amount: number;
    created_at: Date;
    updated_at: Date;
}

// Create a budget
export const createBudget = async (budgetData: Omit<Budget, "id">) => {
    try {
        const newBudget = await db<Budget>("budgets")
            .insert(budgetData)
            .returning("*");
        return newBudget[0];
    } catch (error: any) {
        throw new Error(`Error creating budget: ${error.message}`);
    }
};

// Get all budgets for a user
export const getBudgetsByUser = async (userId: number) => {
    try {
        const budgets = await db<Budget>("budgets").where("user_id", userId);
        return budgets;
    } catch (error: any) {
        throw new Error(`Error fetching budgets: ${error.message}`);
    }
};

// Get a single budget
export const getBudgetById = async (id: number) => {
    try {
        const budget = await db<Budget>("budgets").where("id", id).first();
        if (!budget) {
            throw new Error("No budget found");
        }
        return budget;
    } catch (error: any) {
        throw new Error(`Error fetching budget: ${error.message}`);
    }
};

// Update a goal
export const updateBudget = async (id: number, budgetData: Partial<Budget>) => {
    try {
        const updatedBudget = await db<Budget>("budgets")
            .where("id", id)
            .update(budgetData)
            .returning("*");
        return updatedBudget[0];
    } catch (error: any) {
        throw new Error(`Error updating budget: ${error.message}`);
    }
};

// Delete a goal
export const deleteBudget = async (id: number) => {
    try {
        await db<Budget>("budgets").where("id", id).del();
        return { message: "Budget deleted successfully" };
    } catch (error: any) {
        throw new Error(`Error deleting budget: ${error.message}`);
    }
};
