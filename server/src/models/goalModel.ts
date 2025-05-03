import { db } from "../db/db";

export interface Goal {
    id: number;
    user_id: number;
    target_amount: number;
    current_amount: number;
    title: string;
    target_date: Date;
}

// Create a goal
export const createGoal = async (goalData: Omit<Goal, "id">) => {
    try {
        const newGoal = await db<Goal>("goals").insert(goalData).returning("*");
        return newGoal[0];
    } catch (error: any) {
        throw new Error(`Error creating goal: ${error.message}`);
    }
};

// Get all goals for a user
export const getGoalsByUserId = async (userId: number) => {
    try {
        const goals = await db<Goal>("goals").where("user_id", userId);
        return goals;
    } catch (error: any) {
        throw new Error(`Error fetching goals: ${error.message}`);
    }
};

// Get a single goal
export const getGoalById = async (id: number) => {
    try {
        const goal = await db<Goal>("goals").where("id", id).first();
        if (!goal) {
            throw new Error("No goal found");
        }
        return goal;
    } catch (error: any) {
        throw new Error(`Error fetching goal: ${error.message}`);
    }
};

// Update a goal
export const updateGoal = async (id: number, goalData: Partial<Goal>) => {
    try {
        const updatedGoal = await db<Goal>("goals")
            .where("id", id)
            .update(goalData)
            .returning("*");
        return updatedGoal[0];
    } catch (error: any) {
        throw new Error(`Error updating goal: ${error.message}`);
    }
};

// Delete a goal
export const deleteGoal = async (id: number) => {
    try {
        await db<Goal>("goals").where("id", id).del();
        return { message: "Goal deleted successfully" };
    } catch (error: any) {
        throw new Error(`Error deleting goal: ${error.message}`);
    }
};
