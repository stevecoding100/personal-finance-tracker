import { db } from "../db/db";

interface Goal {
    id?: number;
    user_id: number;
    title: string;
    target_amount: number;
    current_amount: number;
    deadline: string;
    created_at?: Date;
    updated_at?: Date;
}

export const createGoal = async (goalData: Goal) => {
    const [goal] = await db<Goal>("goals")
        .insert({
            ...goalData,
            created_at: new Date(),
            updated_at: new Date(),
        })
        .returning("*");
    return goal;
};

export const getGoalsByUser = async (userId: number) => {
    return db<Goal>("goals").where({ user_id: userId });
};
export const getGoalById = async (id: number) => {
    return db<Goal>("goals").where({ id: id });
};

export const updateGoalAmount = async (goalId: number, amount: number) => {
    const [goal] = await db<Goal>("goals")
        .where({ id: goalId })
        .update({ current_amount: amount, updated_at: new Date() }, ["*"]);
    return goal;
};
