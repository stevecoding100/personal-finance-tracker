import { db } from "../db/db";

export interface Goal {
    id: number;
    user_id: number;
    target_amount: number;
    current_amount: number;
    description: string;
    due_date: Date;
    created_at: Date;
    updated_at: Date;
}

// Create a goal
export const createGoal = async (
    goalData: Omit<Goal, "id" | "created_at" | "updated_at">
) => {
    try {
        const newGoal = await db<Goal>("goals")
            .insert({
                ...goalData,
                created_at: new Date(),
                updated_at: new Date(),
            })
            .returning("*");
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

// Update a goal
export const updateGoal = async (id: number, goalData: Partial<Goal>) => {
    try {
        const updatedGoal = await db<Goal>("goals")
            .where("id", id)
            .update({ ...goalData, updated_at: new Date() })
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
