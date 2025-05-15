"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGoal = exports.updateGoal = exports.getGoalById = exports.getGoalsByUserId = exports.createGoal = void 0;
const db_1 = require("../db/db");
// Create a goal
const createGoal = async (goalData) => {
    try {
        const newGoal = await (0, db_1.db)("goals").insert(goalData).returning("*");
        return newGoal[0];
    }
    catch (error) {
        throw new Error(`Error creating goal: ${error.message}`);
    }
};
exports.createGoal = createGoal;
// Get all goals for a user
const getGoalsByUserId = async (userId) => {
    try {
        const goals = await (0, db_1.db)("goals").where("user_id", userId);
        return goals;
    }
    catch (error) {
        throw new Error(`Error fetching goals: ${error.message}`);
    }
};
exports.getGoalsByUserId = getGoalsByUserId;
// Get a single goal
const getGoalById = async (id) => {
    try {
        const goal = await (0, db_1.db)("goals").where("id", id).first();
        if (!goal) {
            throw new Error("No goal found");
        }
        return goal;
    }
    catch (error) {
        throw new Error(`Error fetching goal: ${error.message}`);
    }
};
exports.getGoalById = getGoalById;
// Update a goal
const updateGoal = async (id, goalData) => {
    try {
        const updatedGoal = await (0, db_1.db)("goals")
            .where("id", id)
            .update(goalData)
            .returning("*");
        return updatedGoal[0];
    }
    catch (error) {
        throw new Error(`Error updating goal: ${error.message}`);
    }
};
exports.updateGoal = updateGoal;
// Delete a goal
const deleteGoal = async (id) => {
    try {
        await (0, db_1.db)("goals").where("id", id).del();
        return { message: "Goal deleted successfully" };
    }
    catch (error) {
        throw new Error(`Error deleting goal: ${error.message}`);
    }
};
exports.deleteGoal = deleteGoal;
